"use client";

interface PricingTabsProps {
  selectedDuration: "monthly" | "yearly" | "twoYear";
  onDurationChange: (duration: "monthly" | "yearly" | "twoYear") => void;
}

export default function PricingTabs({ selectedDuration, onDurationChange }: PricingTabsProps) {
  const tabs = [
    { id: "twoYear" as const, label: "2 Years", description: "Best Value - Save 25%" },
    { id: "yearly" as const, label: "1 Year", description: "Save 15%" },
    { id: "monthly" as const, label: "Monthly", description: "Pay as you go" }
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 flex">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onDurationChange(tab.id)}
            className={`
              px-6 py-3 rounded-lg text-sm font-semibold transition-all duration-200
              ${selectedDuration === tab.id
                ? 'bg-accent text-white shadow-md'
                : 'text-gray-300 hover:text-white'
              }
            `}
          >
            <div className="flex flex-col items-center">
              <span>{tab.label}</span>
              <span className="text-xs opacity-70 mt-1">{tab.description}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}