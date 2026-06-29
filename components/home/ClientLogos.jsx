const LOGOS = [
  { src: '/logos/motorlux.png', alt: 'Motor Lux' },
  { src: '/logos/medflow.png', alt: 'MedFlow' },
  { src: '/logos/gadgetspace.png', alt: 'GadgetSpace' },
  { src: '/logos/texnika.png', alt: 'Texnika Ijara' },
  { src: '/logos/grandosiyo.png', alt: 'Grand Osiyo' },
  { src: '/logos/xwear.png', alt: 'X Wear' },
  { src: '/logos/hilol.png', alt: 'Hilol Market' },
];

export default function ClientLogos() {
  return (
    <section className="clients">
      <div className="wrap">
        <p className="clients-lbl">Bizga ishonishadi</p>
        <div className="logo-row">
          {LOGOS.map((logo) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={logo.alt} src={logo.src} alt={logo.alt} className="clogo" />
          ))}
        </div>
      </div>
    </section>
  );
}
