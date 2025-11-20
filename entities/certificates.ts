{
  "name": "Certificate",
  "type": "object",
  "properties": {
    "student_id": {
      "type": "string",
      "description": "Reference to student ID (must match exactly)"
    },
    "certificate_name": {
      "type": "string",
      "description": "Name of the certificate"
    },
    "course_name": {
      "type": "string",
      "description": "Course for which certificate was earned"
    },
    "issue_date": {
      "type": "string",
      "format": "date",
      "description": "Date when certificate was issued"
    },
    "certificate_id": {
      "type": "string",
      "description": "Unique certificate identifier"
    },
    "certificate_url": {
      "type": "string",
      "description": "URL to the uploaded certificate file (PDF/Image)"
    },
    "description": {
      "type": "string",
      "description": "Certificate description"
    }
  },
  "required": [
    "student_id",
    "certificate_name",
    "course_name",
    "certificate_url"
  ]
}