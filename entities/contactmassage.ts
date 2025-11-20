{
  "name": "ContactMessage",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "description": "Contact person's name"
    },
    "email": {
      "type": "string",
      "description": "Contact person's email"
    },
    "phone": {
      "type": "string",
      "description": "Contact person's phone number"
    },
    "subject": {
      "type": "string",
      "description": "Message subject"
    },
    "message": {
      "type": "string",
      "description": "Message content"
    },
    "status": {
      "type": "string",
      "enum": [
        "new",
        "read",
        "replied"
      ],
      "default": "new",
      "description": "Message status"
    }
  },
  "required": [
    "name",
    "email",
    "subject",
    "message"
  ]
}