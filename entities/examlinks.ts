{
  "name": "ExamLink",
  "type": "object",
  "properties": {
    "student_id": {
      "type": "string",
      "description": "Reference to student ID"
    },
    "exam_title": {
      "type": "string",
      "description": "Title of the exam"
    },
    "exam_url": {
      "type": "string",
      "description": "URL link to the exam"
    },
    "exam_description": {
      "type": "string",
      "description": "Brief description of the exam"
    },
    "is_active": {
      "type": "boolean",
      "description": "Whether exam link is active",
      "default": true
    },
    "due_date": {
      "type": "string",
      "format": "date",
      "description": "Exam due date"
    }
  },
  "required": [
    "student_id",
    "exam_title",
    "exam_url"
  ]
}