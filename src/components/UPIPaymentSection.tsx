"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

interface UPIPaymentSectionProps {
  planName: string;
  planId: string;
  billingPeriod: number;
  totalAmount: number;
}

export default function UPIPaymentSection({
  planName,
  planId,
  billingPeriod,
  totalAmount,
}: UPIPaymentSectionProps) {
  const { user } = useUser();
  const [utrNumber, setUtrNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!utrNumber.trim()) {
      setError("Please enter the UTR/Transaction ID");
      return;
    }

    if (!/^[0-9]+$/.test(utrNumber.trim())) {
      setError("UTR/Transaction ID must contain only numbers");
      return;
    }

    if (!user) {
      setError("User not authenticated");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { data: profileData } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", user.id)
        .single();

      const email = profileData?.email || user.email;

      const { error: paymentError } = await supabase
        .from("payments")
        .insert({
          user_id: user.id,
          email: email,
          plan_name: planName,
          plan_id: planId,
          billing_period: billingPeriod,
          amount: totalAmount,
          utr_number: utrNumber.trim(),
          status: "pending",
          payment_method: "upi",
          created_at: new Date().toISOString(),
        });

      if (paymentError) {
        console.error("Payment submission error:", paymentError);
        setError("Failed to submit payment info. Please try again.");
        return;
      }

      // Send email notification to admin
      try {
        const emailResponse = await fetch('/api/payment-confirmation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            utr: utrNumber.trim(),
            amount: totalAmount.toString(),
            planName: planName
          }),
        });

        if (emailResponse.ok) {
          console.log('✅ Payment notification email sent successfully');
        } else {
          console.log('❌ Failed to send payment notification email');
        }
      } catch (emailError) {
        console.error('Email notification error:', emailError);
        // Don't fail the payment if email fails
      }

      router.push("/verification-in-progress"); // Redirect user to verification page after payment submission
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Complete Your Payment</h2>
      <input
        type="text"
        placeholder="Enter UTR/Transaction ID"
        value={utrNumber}
        onChange={(e) => setUtrNumber(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Submit Payment"}
      </button>
    </div>
  );
}