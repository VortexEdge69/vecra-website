// Fill in once: digits with country code, e.g. "919876543210". Empty hides call/WhatsApp buttons.
export const PHONE = "918096967690";
export const CITY = "Vijayawada, Andhra Pradesh";
export const telLink = "tel:+" + PHONE;
export const waLink = (text: string) => "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text);
export const phoneText = PHONE.replace(/^91(\d{5})(\d{5})$/, "+91 $1 $2");
