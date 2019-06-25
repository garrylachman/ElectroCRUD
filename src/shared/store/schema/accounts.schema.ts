export const AccountsSchema = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
  "type": "object",
  "title": "The Root Schema",
  "required": [
    "accounts"
  ],
  "properties": {
    "accounts": {
      "$id": "#/properties/accounts",
      "type": "array",
      "title": "The Accounts Schema",
      "items": {
        "$id": "#/properties/accounts/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "id",
          "name",
          "creation_date",
          "modify_date",
          "ssh",
          "server"
        ],
        "properties": {
          "id": {
            "$id": "#/properties/accounts/items/properties/id",
            "type": "integer",
            "title": "The Id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "name": {
            "$id": "#/properties/accounts/items/properties/name",
            "type": "string",
            "title": "The Name Schema",
            "default": "",
            "examples": [
              "account1"
            ],
            "pattern": "^(.*)$"
          },
          "creation_date": {
            "$id": "#/properties/accounts/items/properties/creation_date",
            "type": "string",
            "title": "The Creation_date Schema",
            "default": "",
            "examples": [
              "2019-06-25T16:59:19.522Z"
            ],
            "pattern": "^(.*)$"
          },
          "modify_date": {
            "$id": "#/properties/accounts/items/properties/modify_date",
            "type": "string",
            "title": "The Modify_date Schema",
            "default": "",
            "examples": [
              "2019-06-25T16:59:19.522Z"
            ],
            "pattern": "^(.*)$"
          },
          "ssh": {
            "$id": "#/properties/accounts/items/properties/ssh",
            "type": "object",
            "title": "The Ssh Schema",
            "required": [
              "enabled"
            ],
            "properties": {
              "enabled": {
                "$id": "#/properties/accounts/items/properties/ssh/properties/enabled",
                "type": "boolean",
                "title": "The Enabled Schema",
                "default": false,
                "examples": [
                  true
                ]
              },
              "hostname": {
                "$id": "#/properties/accounts/items/properties/ssh/properties/hostname",
                "type": "string",
                "title": "The Hostname Schema",
                "default": "",
                "examples": [
                  "garry.com"
                ],
                "pattern": "^(.*)$"
              },
              "port": {
                "$id": "#/properties/accounts/items/properties/ssh/properties/port",
                "type": "integer",
                "title": "The Port Schema",
                "default": 0,
                "examples": [
                  123
                ]
              },
              "username": {
                "$id": "#/properties/accounts/items/properties/ssh/properties/username",
                "type": "string",
                "title": "The Username Schema",
                "default": "",
                "examples": [
                  "root"
                ],
                "pattern": "^(.*)$"
              },
              "password": {
                "$id": "#/properties/accounts/items/properties/ssh/properties/password",
                "type": "string",
                "title": "The Password Schema",
                "default": "",
                "examples": [
                  "123"
                ],
                "pattern": "^(.*)$"
              }
            }
          },
          "server": {
            "$id": "#/properties/accounts/items/properties/server",
            "type": "object",
            "title": "The Server Schema",
            "required": [
              "server_type",
              "hostname",
              "port",
              "username",
              "database"
            ],
            "properties": {
              "server_type": {
                "$id": "#/properties/accounts/items/properties/server/properties/server_type",
                "type": "integer",
                "title": "The Server_type Schema",
                "default": 0,
                "examples": [
                  1
                ]
              },
              "hostname": {
                "$id": "#/properties/accounts/items/properties/server/properties/hostname",
                "type": "string",
                "title": "The Hostname Schema",
                "default": "",
                "examples": [
                  "127.0.0.1"
                ],
                "pattern": "^(.*)$"
              },
              "port": {
                "$id": "#/properties/accounts/items/properties/server/properties/port",
                "type": "integer",
                "title": "The Port Schema",
                "default": 0,
                "examples": [
                  3306
                ]
              },
              "username": {
                "$id": "#/properties/accounts/items/properties/server/properties/username",
                "type": "string",
                "title": "The Username Schema",
                "default": "",
                "examples": [
                  "root"
                ],
                "pattern": "^(.*)$"
              },
              "password": {
                "$id": "#/properties/accounts/items/properties/server/properties/password",
                "type": "string",
                "title": "The Password Schema",
                "default": "",
                "examples": [
                  "123"
                ],
                "pattern": "^(.*)$"
              },
              "database": {
                "$id": "#/properties/accounts/items/properties/server/properties/database",
                "type": "string",
                "title": "The Database Schema",
                "default": "",
                "examples": [
                  "db1"
                ],
                "pattern": "^(.*)$"
              }
            }
          }
        }
      }
    }
  }
};