namespace Rashtan.AuditStory.Payment

open Microsoft.Extensions.Configuration
open Braintree;
open Rashtan.AuditStory.Dto

type IPaymentGizmo = 
    abstract member GenerateNonceAsync: unit -> Async<string>
    abstract member SaleAsync: payment: PaymentToProcess -> Async<Result<PaymentProcessed, string>>

type PaymentGizmo(configuration: IConfiguration) =
    
    let gateway =       
        let payment = configuration.GetSection("Payment");
        let gateway = BraintreeGateway()
        gateway.Environment <- Braintree.Environment.ParseEnvironment(payment.["Environment"])
        gateway.MerchantId <- payment.["MerchantId"]
        gateway.PublicKey <- payment.["PublicKey"]
        gateway.PrivateKey <- payment.["PrivateKey"]
        gateway

    interface IPaymentGizmo with
        member __.GenerateNonceAsync() = async {
            return! gateway.ClientToken.GenerateAsync() |> Async.AwaitTask
        }

        member __.SaleAsync (payment: PaymentToProcess) = async {
            let request = 
                let request = TransactionRequest()
                request.Amount <- payment.Amount
                request.PaymentMethodNonce <- payment.Nonce
                request.Options <- TransactionOptionsRequest()
                request.Options.SubmitForSettlement <- System.Nullable(true)
                request
            try 
                let! result = gateway.Transaction.SaleAsync(request) |> Async.AwaitTask
            
                if result.IsSuccess() then
                    let paymentProcessed = {
                        TransactionId = result.Target.AuthorizedTransactionId
                        Amount = payment.Amount
                        Currency = "USD"
                        Method = result.Target.Channel
                        PayedAt = System.DateTime.Today.ToUniversalTime()
                        PayedUntil = System.DateTime.Today.AddDays(payment.Length |> float).ToUniversalTime()
                    }

                    return Ok paymentProcessed;
                else
                    return Error result.Message;
            with
                | ex -> return Error ex.Message
            }