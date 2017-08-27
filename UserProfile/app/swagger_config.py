

swagger_template = {
    "info": {
        "title": "User Profile API",
        "description": "API to use in Sunset Hackathon 2017's project ",
        "contact": {
            "responsibleOrganization": "Team 1",
            "responsibleDeveloper": "Me",
            "email": "ruidamendes@ua.pt",
        },
        "version": "0.1"
    },
    # "host": "http://localhost:5000",  # overrides localhost:500
    "basePath": "/",  # base bash for blueprint registration
    "schemes": [
        "http"
    ],
    "specs_route": "/api/",
    "responses": {
        "NotFoundError": {
            "description": "The requested URL was not found on the server.",
        }
    }

}