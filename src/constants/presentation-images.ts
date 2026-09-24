import type { PresentationImage } from "@/types/content";

// Temporary presentation imagery for mock/demo pages. Replace with approved MCMC-owned assets before production.
export const presentationImages = {
  heroHospital: {
    src: "/images/mock/mcmc-hero-hospital.jpg",
    alt: "Patients speaking with a hospital reception staff member",
    sourceName: "Pexels - Pavel Danilyuk",
    sourceUrl: "https://www.pexels.com/photo/people-at-registration-in-a-clinic-7108329/",
  },
  aboutHospitalCare: {
    src: "/images/mock/about-hospital-care.jpg",
    alt: "Doctor consulting with a patient in a bright medical office",
    sourceName: "Pexels - Los Muertos Crew",
    sourceUrl: "https://www.pexels.com/photo/a-patient-at-a-doctor-s-office-8460095/",
  },
  doctors: {
    femalePortraitOne: {
      src: "/images/mock/doctor-placeholder-01.jpg",
      alt: "Female doctor in a white coat with a stethoscope",
      sourceName: "Pexels - Pavel Danilyuk",
      sourceUrl: "https://www.pexels.com/photo/physician-in-white-coat-wearing-a-stethoscope-5998476/",
    },
    malePortraitOne: {
      src: "/images/mock/doctor-placeholder-02.jpg",
      alt: "Male doctor in a white coat with a stethoscope",
      sourceName: "Pexels - Ivan Samkov",
      sourceUrl: "https://www.pexels.com/photo/a-man-wearing-a-medical-gown-looking-away-4989136/",
    },
    malePortraitTwo: {
      src: "/images/mock/doctor-placeholder-03.jpg",
      alt: "Male doctor wearing a white coat and stethoscope",
      sourceName: "Pexels - Usman Yousaf",
      sourceUrl: "https://www.pexels.com/photo/a-man-in-white-coat-with-stethoscope-6762862/",
    },
    malePortraitThree: {
      src: "/images/mock/doctor-placeholder-04.jpg",
      alt: "Doctor standing in a clinical room with arms crossed",
      sourceName: "Pexels - RDNE Stock project",
      sourceUrl: "https://www.pexels.com/photo/portrait-of-a-doctor-6129500/",
    },
    femalePortraitTwo: {
      src: "/images/mock/doctor-placeholder-05.jpg",
      alt: "Female doctor portrait in a white coat",
      sourceName: "Pexels - Pavel Danilyuk",
      sourceUrl: "https://www.pexels.com/photo/physician-in-white-coat-wearing-a-stethoscope-5998474/",
    },
  },
  services: {
    emergency: {
      src: "/images/mock/service-emergency.jpg",
      alt: "Paramedics inside an ambulance preparing for emergency care",
      sourceName: "Pexels - Pavel Danilyuk",
      sourceUrl: "https://www.pexels.com/photo/paramedics-inside-an-ambulance-6753488/",
    },
    laboratory: {
      src: "/images/mock/service-laboratory.jpg",
      alt: "Laboratory technician working with medical samples",
      sourceName: "Pexels - Tima Miroshnichenko",
      sourceUrl: "https://www.pexels.com/photo/man-technology-white-zoom-9574519/",
    },
    radiology: {
      src: "/images/mock/service-radiology.jpg",
      alt: "Doctor reviewing an x-ray image",
      sourceName: "Pexels - Maryam Kamavova",
      sourceUrl: "https://www.pexels.com/photo/doctor-looking-at-an-x-ray-12149119/",
    },
    pediatrics: {
      src: "/images/mock/service-pediatrics.jpg",
      alt: "Pediatrician examining a child patient",
      sourceName: "Pexels - Pavel Danilyuk",
      sourceUrl: "https://www.pexels.com/photo/a-doctor-examining-a-child-patient-5998458/",
    },
    outpatientCare: {
      src: "/images/mock/service-outpatient-care.jpg",
      alt: "Doctor speaking with a patient during a clinic consultation",
      sourceName: "Pexels - cottonbro studio",
      sourceUrl: "https://www.pexels.com/photo/a-doctor-talking-the-patient-7579831/",
    },
  },
} satisfies Record<string, PresentationImage | Record<string, PresentationImage>>;
