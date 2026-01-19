import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';


export default function ServicesAccordion() {
  const services = [
    {
      title: 'Power Transformers',
      description:
        'We manufacture power transformers tailored to client specifications with high efficiency and safety standards.',
    },
    {
      title: 'Distribution Transformers',
      description:
        'Robust distribution transformers designed for diverse industrial and commercial applications.',
    },
    {
      title: 'Repair & Maintenance',
      description:
        'We offer complete repair, retrofitting, and maintenance services to extend transformer life.',
    },
    {
      title: 'Customized Solutions',
      description:
        'Our engineering team delivers custom solutions to meet unique voltage and current requirements.',
    },
  ];

  return (
    <section className="bg-[#F7F7F8] py-12 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[#26262B] text-center mb-8">
          Our Services
        </h2>

        <div className="space-y-4">
          {services.map((service, index) => (
            <Disclosure key={index}>
              {({ open }) => (
                <div className="border border-[#E0E0E0] bg-white rounded-lg shadow-sm overflow-hidden">
                  <Disclosure.Button className="flex w-full justify-between items-center px-4 py-3 text-left font-medium hover:bg-secondary transition">
                    <span>{service.title}</span>
                    <ChevronUpIcon
                      className={`h-5 w-5 transition-transform duration-300 ${
                        open ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </Disclosure.Button>

                  <Transition
                    enter="transition duration-300 ease-out"
                    enterFrom="transform scale-y-95 opacity-0"
                    enterTo="transform scale-y-100 opacity-100"
                    leave="transition duration-200 ease-in"
                    leaveFrom="transform scale-y-100 opacity-100"
                    leaveTo="transform scale-y-95 opacity-0"
                  >
                    <Disclosure.Panel className="px-4 pb-4 text-sm text-gray-600 origin-top">
                      {service.description}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}

