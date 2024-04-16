lab1 = [
    {
        "$search": {
            "index": "language_index",
            "text": {
                "query": term,
                "path": "post_text",
                //"fuzzy":{},
                "synonyms": "my-mapping"
            }
        }
    },
    {
        "$limit": 20
    }
]

lab2 = {
    "index":"language_index",
    "autocomplete": {
        "query": term,
        "path": "post_title"
    }
}

lab3 = [
    {
        "$search": {
            "index": "language_index",
            "compound": {
                "filter": [
                    {
                        "equals": {
                            "path": "mongodb_staff",
                            "value": true
                        }
                    }
                ],
                "must": [
                    {
                        "text": {
                            "path": "post_text",
                            "query": term
                        }
                    }
                ]
            }
        }
    },
    {
        "$limit": 20
    }
]

lab4 = [
    {
        "$search": {
            "index": "keyword_index",
            "text": {
                "query": term,
                "path": "post_title"
            }
        }
    },
    {
        "$limit": 20
    }
]

lab5 = [
    {
        "$search": {
            "index": "language_index",
            "compound": {
                "must": [
                    {
                        "near": {
                            "origin": post_date,
                            "path": "created_at",
                            "pivot": 1
                        }
                    },
                    {
                        "text": {
                            "query": term,
                            "path": "post_text"
                        }
                    }
                ]
            }
        }
    },
    {
        "$limit": 20
    }
]

lab6 = {
    "index": "language_index",
    "queryString": {
        "query": term,
        "defaultPath": "post_text"
    }
}

lab7 = {
    "index": "facet_index",
    "facet": {
        "operator": {
            "range": {
                "path": "reply_count",
                "gte": 0,
                "lte": 999999
            }
        },
        "facets": {
            "reply_count_facet": {
                "type": "number",
                "path": "reply_count",
                "boundaries": [0, 5, 10, 15, 20],
                "default": "More than 20"
            },
            "username_facet": {
                "type": "string",
                "path": "user.full_name",
                "numBuckets": 25
            }
        }
    }
}