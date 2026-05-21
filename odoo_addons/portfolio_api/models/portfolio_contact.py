from odoo import fields, models


class PortfolioContact(models.Model):
    _name = "portfolio.contact"
    _description = "Portfolio Contact Message"
    _order = "create_date desc"

    name = fields.Char(required=True)
    email = fields.Char(required=True)
    phone = fields.Char()
    message = fields.Text(required=True)
    source = fields.Char(default="portfolio-react")
    ip_address = fields.Char(readonly=True)
    user_agent = fields.Text(readonly=True)
    state = fields.Selection(
        [
            ("new", "New"),
            ("reviewed", "Reviewed"),
            ("closed", "Closed"),
        ],
        default="new",
        required=True,
    )
