namespace Rashtan.AuditStory.Dto

open Common

module Checklist =
    type ChecklistItem = {
        Question: string
        Answer: string
        Pass: Understanding
    }

