{
  "name": "Student",
  "type": "object",
  "properties": {
    "student_id": {
      "type": "string",
      "description": "Unique student identifier"
    },
    "name": {
      "type": "string",
      "description": "Student full name"
    },
    "username": {
      "type": "string",
      "description": "Student username"
    },
    "phone_number": {
      "type": "string",
      "description": "Student phone number"
    },
    "address": {
      "type": "string",
      "description": "Student address"
    },
    "bio": {
      "type": "string",
      "description": "Student bio"
    },
    "profile_picture_url": {
      "type": "string",
      "description": "URL of student's profile picture"
    },
    "welcome_email_sent": {
      "type": "boolean",
      "description": "Whether welcome email has been sent",
      "default": false
    },
    "active_courses": {
      "type": "number",
      "description": "Number of active courses",
      "default": 0
    },
    "overall_progress": {
      "type": "number",
      "description": "Overall learning progress percentage",
      "default": 0
    },
    "learning_streak": {
      "type": "number",
      "description": "Days of continuous learning",
      "default": 0
    },
    "earned_certificates": {
      "type": "number",
      "description": "Number of earned certificates",
      "default": 0
    },
    "earned_badges": {
      "type": "array",
      "description": "List of earned badge names",
      "items": {
        "type": "string"
      },
      "default": []
    },
    "active_course_name": {
      "type": "string",
      "description": "Name of current active course"
    },
    "active_course_progress": {
      "type": "number",
      "description": "Progress in active course",
      "default": 0
    }
  },
  "required": [
    "name"
  ]
}