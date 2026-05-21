import json

from odoo import http
from odoo.http import request


class PortfolioApiController(http.Controller):
    def _cors_headers(self):
        return [
            ("Access-Control-Allow-Origin", "*"),
            ("Access-Control-Allow-Headers", "Content-Type"),
            ("Access-Control-Allow-Methods", "GET, POST, OPTIONS"),
        ]

    def _json_response(self, payload, status=200):
        return request.make_json_response(payload, status=status, headers=self._cors_headers())

    @http.route(
        "/api/portfolio/projects",
        type="http",
        auth="public",
        methods=["GET", "OPTIONS"],
        csrf=False,
    )
    def get_projects(self, **kwargs):
        if request.httprequest.method == "OPTIONS":
            return request.make_response("", headers=self._cors_headers())

        projects = request.env["portfolio.project"].sudo().search(
            [("active", "=", True), ("is_published", "=", True)],
            order="sequence asc, id desc",
        )
        data = [project.to_public_dict() for project in projects]
        return self._json_response({"ok": True, "data": data})

    @http.route(
        "/api/portfolio/contact",
        type="http",
        auth="public",
        methods=["POST", "OPTIONS"],
        csrf=False,
    )
    def create_contact(self, **kwargs):
        if request.httprequest.method == "OPTIONS":
            return request.make_response("", headers=self._cors_headers())

        try:
            payload = json.loads(request.httprequest.get_data(cache=False, as_text=True) or "{}")
        except ValueError:
            return self._json_response(
                {"ok": False, "error": "Invalid JSON payload."},
                status=400,
            )

        name = (payload.get("name") or "").strip()
        email = (payload.get("email") or "").strip()
        phone = (payload.get("phone") or "").strip()
        message = (payload.get("message") or "").strip()
        source = (payload.get("source") or "portfolio-react").strip()

        if not name or not email or not message:
            return self._json_response(
                {"ok": False, "error": "Name, email, and message are required."},
                status=400,
            )

        contact = request.env["portfolio.contact"].sudo().create(
            {
                "name": name,
                "email": email,
                "phone": phone,
                "message": message,
                "source": source,
                "ip_address": request.httprequest.remote_addr,
                "user_agent": request.httprequest.headers.get("User-Agent"),
            }
        )

        return self._json_response(
            {
                "ok": True,
                "message": "Your message has been stored in Odoo.",
                "data": {"id": contact.id},
            },
            status=201,
        )
