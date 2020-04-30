namespace Rashtan.AuditStory.Dto

[<CLIMutable>]
type Category = {
  Name: string
  Color: string
}

module Category =
    let defaultCategories = [|
            {
                Name = "Wonderful"
                Color = "#4CAF50"
            }
            {
                Name = "Too hard"
                Color = "#FF5722"
            }
            {
                Name = "Not wonderful"
                Color = "#FF9800"
            }
        |]
