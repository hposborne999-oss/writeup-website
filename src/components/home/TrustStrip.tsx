import { Container } from "../Container";

const items = [
  {
    num: "01",
    title: "Approved RICS Tech Partner",
    body: "Accelerating meaningful technology for RICS members.",
  },
  {
    num: "02",
    title: "Responsible AI",
    body: "Your work stays yours – no training AI models or reports stored.",
  },
  {
    num: "03",
    title: "Built by a valuer",
    body: "Created by a practising MRICS Chartered Surveyor.",
  },
];

export function TrustStrip() {
  return (
    <section className="bg-paper py-14 lg:py-16 border-b border-rule">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {items.map((item, i) => (
            <div
              key={item.num}
              className={`flex flex-col gap-2 md:pr-8 ${
                i < items.length - 1 ? "md:border-r border-rule" : ""
              }`}
            >
              <div className="font-mono text-[10px] font-medium tracking-[0.16em] uppercase text-slate-500">
                {item.num}
              </div>
              <h3 className="text-[16px] lg:text-[17px] font-semibold text-ink leading-[1.3] tracking-[-0.005em] m-0">
                {item.title}
              </h3>
              <p className="text-[14px] lg:text-[14.5px] leading-[1.55] text-slate-700 m-0">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
