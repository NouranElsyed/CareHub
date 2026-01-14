import {
  Stethoscope,
  HeartPulse,
  Brain,
  Baby,
  Syringe,
  ShieldCheck,
} from "lucide-react";
import Motion from "../ui/Motion";

const services = [
  {
    title: "General Checkups",
    desc: "Routine medical examinations to ensure your overall health.",
    icon: Stethoscope,
  },
  {
    title: "Cardiology",
    desc: "Advanced heart care with experienced cardiology specialists.",
    icon: HeartPulse,
  },
  {
    title: "Neurology",
    desc: "Comprehensive diagnosis and treatment for neurological disorders.",
    icon: Brain,
  },
  {
    title: "Pediatrics",
    desc: "Specialized healthcare services for infants and children.",
    icon: Baby,
  },
  {
    title: "Vaccinations",
    desc: "Safe and reliable vaccination services for all age groups.",
    icon: Syringe,
  },
  {
    title: "Health Insurance",
    desc: "We work with trusted insurance providers for your peace of mind.",
    icon: ShieldCheck,
  },
];

const Services = () => {
  return (
    <section
      id={"services"}
      className=" pt-30 pb-20 md:min-h-screen px-6 md:px-20 text-cyan-900 flex items-center "
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <Motion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-amber-500">Services</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We provide a wide range of medical services to meet your healthcare
            needs with quality and care.
          </p>
        </Motion>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Motion
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-cyan-600/10 backdrop-blur-md rounded-2xl p-8 hover:bg-cyan-600/20 transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#feac39]/20 text-[#feac39] mb-6">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>

                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </Motion>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default Services;
