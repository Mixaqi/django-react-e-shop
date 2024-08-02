from __future__ import annotations

from enum import Enum


class ChoiceEnum(Enum):
    @classmethod
    def choices(cls) -> list[tuple[str, str]]:
        return [(status.value, status.name) for status in cls]
