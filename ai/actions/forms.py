from rasa_sdk.forms import FormValidationAction

class ValidateFeeForm(FormValidationAction):
    def name(self) -> str:
        return "validate_fee_form"

    def validate_course(self, slot_value: str, dispatcher, tracker, domain):
        # A simple validation example
        if slot_value.lower() in ["b.tech", "m.tech", "b.a.", "bachelor's", "master's"]:
            return {"course": slot_value}
        else:
            dispatcher.utter_message(text="I'm sorry, I don't have information for that course. Please try again.")
            return {"course": None}

    def validate_department(self, slot_value: str, dispatcher, tracker, domain):
        # A simple validation example
        if slot_value.lower() in ["computer science", "cse", "electrical engineering", "ece", "mechanical engineering"]:
            return {"department": slot_value}
        else:
            dispatcher.utter_message(text="I'm sorry, I don't have information for that department. Please try again.")
            return {"department": None}

    def validate_degree(self, slot_value: str, dispatcher, tracker, domain):
        # A simple validation example
        if slot_value.lower() in ["bachelor's", "master's"]:
            return {"degree": slot_value}
        else:
            dispatcher.utter_message(text="I'm sorry, I don't have information for that degree. Please try again.")
            return {"degree": None}