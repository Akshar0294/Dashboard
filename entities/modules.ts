{
  "name": "Module",
  "type": "object",
  "properties": {
    "domain": {
      "type": "string",
      "enum": [
        "Cyber Security",
        "Ethical Hacking",
        "SOC",
        "Digital Forensics"
      ],
      "description": "Course domain category"
    },
    "module_title": {
      "type": "string",
      "description": "Title of the module"
    },
    "module_number": {
      "type": "number",
      "description": "Module sequence number"
    },
    "video_url": {
      "type": "string",
      "description": "Embedded video URL (YouTube, Vimeo, etc.)"
    },
    "description": {
      "type": "string",
      "description": "Module description"
    },
    "duration": {
      "type": "string",
      "description": "Video duration (e.g., '45 min')"
    },
    "is_active": {
      "type": "boolean",
      "description": "Whether module is visible to students",
      "default": true
    }
  },
  "required": [
    "domain",
    "module_title",
    "video_url"
  ]
}