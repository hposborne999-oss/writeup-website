import { Container } from "../Container";

const items = [
  { label: "Recognition", value: "RICS Tech Partner" },
  {
    label: "Standards",
    value:
      "Aligned with RICS Professional Standard on Responsible Use of AI",
  },
  {
    label: "Data",
    value: "No reports stored. No model training on your work.",
  },
  {
    label: "Authorship",
    value: "Built by a practising MRICS Chartered Surveyor",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-paper py-9 border-b border-rule">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <div
              key={item.label}
              className={`flex flex-col gap-1.5 pr-6 ${
                i < items.length - 1 ? "md:border-r border-rule" : ""
              }`}
            >
              <div className="font-mono text-[10px] font-medium tracking-[0.14em] uppercase text-slate-500">
                {item.label}
              </div>
              <div className="text-[14px] font-medium text-ink leading-[1.4]">
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
