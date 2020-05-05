using Microsoft.Extensions.Configuration;
using Rashtan.AuditStory.Common;
using Rashtan.AuditStory.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Rashtan.AuditStory.PaypalPayment
{
    internal class PaypalService : IPaypalService
    {
        private const string payment_status = "payment_status";
        private const string receiver_email = "receiver_email";
        private const string mc_currency = "mc_currency";
        private const string payer_email = "payer_email";
        private const string mc_gross = "mc_gross";
        private const string item_name = "item_name";
        private const string item_name1 = "item_name1";
        private const string txn_id = "txn_id";

        private HttpClient HttpClient { get; }
        public string ReceiverEmail { get; }
        public string Monthly { get; }
        public string Annual { get; }

        public PaypalService(IHttpClientFactory httpClient, IConfiguration configuration)
        {
            HttpClient = httpClient.CreateClient();

            var section = configuration.GetSection("Paypal");
            ReceiverEmail = section["ReceiverEmail"];
            Monthly = section["Monthly"];
            Annual = section["Annual"];
        }

        public async Task<CsResult<PaymentProcessed>> VerifyRequestAsync(string reqBody)
        {
            if (string.IsNullOrEmpty(reqBody))
                return CsResult<PaymentProcessed>.createError("Request has no body");

            var dict = ReadRequestBodyDictionary(reqBody);

            var auth = await AuthenticateRequestAsync(reqBody, dict);
            if (!string.IsNullOrEmpty(auth))
                return CsResult<PaymentProcessed>.createError(auth);

            if (VerifyRequest(dict))
                return CsResult<PaymentProcessed>.createResult(ExtractPaymentInfo(dict));

            return CsResult<PaymentProcessed>.createError("Not all fields are present");
        }

        private IReadOnlyDictionary<string, string> ReadRequestBodyDictionary(string reqBody)
            => reqBody.Split('&').Select(s => s.Split('=')).ToDictionary(s => s[0], s => s[1]);

        private async Task<string> AuthenticateRequestAsync(string reqBody, IReadOnlyDictionary<string, string> reqDict)
        {
            var isTest = reqDict.Any(s => s.Key == "test_ipn");
            var url = isTest ? "https://ipnpb.sandbox.paypal.com/cgi-bin/webscr" : "https://ipnpb.paypal.com/cgi-bin/webscr";

            var streamContent = new StreamContent(
                new System.IO.MemoryStream(
                    Encoding.ASCII.GetBytes(
                        $"cmd=_notify-validate&{reqBody}")));
            var verifyResponse = await HttpClient.PostAsync(url, streamContent);
            
            var verifyContent = await verifyResponse.Content.ReadAsStringAsync();
            if (verifyContent.Equals("VERIFIED"))
            {
                return string.Empty;
            }
            return verifyContent;
        }

        private bool VerifyRequest(IReadOnlyDictionary<string, string> reqBody)
        {
            // If the payment_status is Completed
            if (!reqBody.ContainsKey(payment_status) || reqBody[payment_status] != "Completed")
                return false;

            if (!reqBody.ContainsKey(receiver_email) || reqBody[receiver_email] != ReceiverEmail)
                return false;

            if (!reqBody.ContainsKey(mc_currency) || reqBody[mc_currency] != "USD")
                return false;

            var itemName = reqBody.ContainsKey(item_name) ? item_name : item_name1;
            if (!reqBody.ContainsKey(itemName) || 
                (reqBody[itemName] != Monthly && reqBody[itemName] != Annual))
                return false;

            if (!reqBody.ContainsKey(mc_gross) || !TryParseDecimal(reqBody[mc_gross], out var gross))
            {
                return false;
            }
            else if (gross <= 0)
                return false;

            if (!reqBody.ContainsKey(payer_email) ||
                !reqBody.ContainsKey(txn_id))
                return false;

            return true;
        }

        private PaymentProcessed ExtractPaymentInfo(IReadOnlyDictionary<string, string> reqBody)
        {            
            var itemName = reqBody.ContainsKey(item_name) ? item_name : item_name1;
            var name = reqBody[itemName];
            var months = name == Monthly ? 1 : 12;

            return new PaymentProcessed(
                reqBody[payer_email],
                ParseDecimal(reqBody[mc_gross]),
                reqBody[mc_currency],
                name,
                months,
                reqBody[txn_id],
                DateTime.UtcNow);
        }

        private static bool TryParseDecimal(string str, out decimal result)
        {
            str = str
                .Replace(".", System.Globalization.NumberFormatInfo.CurrentInfo.NumberDecimalSeparator)
                .Replace(",", System.Globalization.NumberFormatInfo.CurrentInfo.NumberDecimalSeparator);

            return decimal.TryParse(str, out result);
        }
        private static decimal ParseDecimal(string str)
        {
            TryParseDecimal(str, out var result);
            return result;
        }
    }
}
