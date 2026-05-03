import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env.namecheap') });

export const namecheapConfig = {
  // API
  apiUser: process.env.NAMECHEAP_API_USER!,
  apiKey: process.env.NAMECHEAP_API_KEY!,
  userName: process.env.NAMECHEAP_USERNAME!,
  clientIp: process.env.NAMECHEAP_CLIENT_IP!,
  apiUrl: process.env.NAMECHEAP_API_URL!,

  // Registrant
  registrant: {
    firstName: process.env.NAMECHEAP_REGISTRANT_FIRST_NAME!,
    lastName: process.env.NAMECHEAP_REGISTRANT_LAST_NAME!,
    address1: process.env.NAMECHEAP_REGISTRANT_ADDRESS1!,
    address2: process.env.NAMECHEAP_REGISTRANT_ADDRESS2 || '',
    city: process.env.NAMECHEAP_REGISTRANT_CITY!,
    stateProvince: process.env.NAMECHEAP_REGISTRANT_STATE_PROVINCE!,
    postalCode: process.env.NAMECHEAP_REGISTRANT_POSTAL_CODE!,
    country: process.env.NAMECHEAP_REGISTRANT_COUNTRY!,
    phone: process.env.NAMECHEAP_REGISTRANT_PHONE!,
    email: process.env.NAMECHEAP_REGISTRANT_EMAIL!,
  },

  // Tech contact
  tech: {
    firstName: process.env.NAMECHEAP_TECH_FIRST_NAME!,
    lastName: process.env.NAMECHEAP_TECH_LAST_NAME!,
    address1: process.env.NAMECHEAP_TECH_ADDRESS1!,
    address2: process.env.NAMECHEAP_TECH_ADDRESS2 || '',
    city: process.env.NAMECHEAP_TECH_CITY!,
    stateProvince: process.env.NAMECHEAP_TECH_STATE_PROVINCE!,
    postalCode: process.env.NAMECHEAP_TECH_POSTAL_CODE!,
    country: process.env.NAMECHEAP_TECH_COUNTRY!,
    phone: process.env.NAMECHEAP_TECH_PHONE!,
    email: process.env.NAMECHEAP_TECH_EMAIL!,
  },

  // Admin contact
  admin: {
    firstName: process.env.NAMECHEAP_ADMIN_FIRST_NAME!,
    lastName: process.env.NAMECHEAP_ADMIN_LAST_NAME!,
    address1: process.env.NAMECHEAP_ADMIN_ADDRESS1!,
    address2: process.env.NAMECHEAP_ADMIN_ADDRESS2 || '',
    city: process.env.NAMECHEAP_ADMIN_CITY!,
    stateProvince: process.env.NAMECHEAP_ADMIN_STATE_PROVINCE!,
    postalCode: process.env.NAMECHEAP_ADMIN_POSTAL_CODE!,
    country: process.env.NAMECHEAP_ADMIN_COUNTRY!,
    phone: process.env.NAMECHEAP_ADMIN_PHONE!,
    email: process.env.NAMECHEAP_ADMIN_EMAIL!,
  },

  // AuxBilling
  auxBilling: {
    firstName: process.env.NAMECHEAP_AUXBILLING_FIRST_NAME!,
    lastName: process.env.NAMECHEAP_AUXBILLING_LAST_NAME!,
    address1: process.env.NAMECHEAP_AUXBILLING_ADDRESS1!,
    address2: process.env.NAMECHEAP_AUXBILLING_ADDRESS2 || '',
    city: process.env.NAMECHEAP_AUXBILLING_CITY!,
    stateProvince: process.env.NAMECHEAP_AUXBILLING_STATE_PROVINCE!,
    postalCode: process.env.NAMECHEAP_AUXBILLING_POSTAL_CODE!,
    country: process.env.NAMECHEAP_AUXBILLING_COUNTRY!,
    phone: process.env.NAMECHEAP_AUXBILLING_PHONE!,
    email: process.env.NAMECHEAP_AUXBILLING_EMAIL!,
  },
};