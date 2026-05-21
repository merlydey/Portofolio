from odoo import fields, models


class PortfolioProject(models.Model):
    _name = "portfolio.project"
    _description = "Portfolio Project"
    _order = "sequence asc, id desc"

    name = fields.Char(required=True)
    description = fields.Text()
    image_url = fields.Char(string="Image URL")
    tags = fields.Char(
        help="Comma-separated tags. Example: React, Odoo, TailwindCSS",
    )
    demo_url = fields.Char(string="Demo URL")
    github_url = fields.Char(string="GitHub URL")
    is_published = fields.Boolean(default=True)
    active = fields.Boolean(default=True)
    sequence = fields.Integer(default=10)

    def _split_tags(self):
        self.ensure_one()
        return [tag.strip() for tag in (self.tags or "").split(",") if tag.strip()]

    def to_public_dict(self):
        self.ensure_one()
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description or "",
            "image_url": self.image_url or "",
            "tags": self._split_tags(),
            "demo_url": self.demo_url or "",
            "github_url": self.github_url or "",
            "sequence": self.sequence,
        }
