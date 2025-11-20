{
  "name": "ExamScore",
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
    "score": {
      "type": "number",
      "description": "Score obtained by student"
    },
    "total_marks": {
      "type": "number",
      "description": "Total marks for the exam"
    },
    "exam_date": {
      "type": "string",
      "format": "date",
      "description": "Date when exam was taken"
    },
    "remarks": {
      "type": "string",
      "description": "Additional remarks or feedback"
    }
  },
  "required": [
    "student_id",
    "exam_title",
    "score",
    "total_marks"
  ]
}