import React from 'react';

const COUNTRY_CODES: Record<string, string> = {
  ghana: 'GH',
  nigeria: 'NG',
  kenya: 'KE',
  rwanda: 'RW',
  uganda: 'UG',
  tanzania: 'TZ',
  'south africa': 'ZA',
  egypt: 'EG',
  cameroon: 'CM',
  senegal: 'SN',
  "cote d'ivoire": 'CI',
  'ivory coast': 'CI',
  ethiopia: 'ET',
  morocco: 'MA',
  zambia: 'ZM',
  zimbabwe: 'ZW',
  botswana: 'BW',
  liberia: 'LR',
  'sierra leone': 'SL',
  gambia: 'GM',
  togo: 'TG',
  benin: 'BJ',
  'united states': 'US',
  'united kingdom': 'GB',
  canada: 'CA',
};

const getCountryCode = (country?: string) => {
  const normalized = country?.trim().toLowerCase();
  if (!normalized) return undefined;

  const code = COUNTRY_CODES[normalized] ?? country?.trim().toUpperCase();
  return /^[A-Z]{2}$/.test(code ?? '') ? code : undefined;
};

const CountryFlag: React.FC<{ country?: string }> = ({ country }) => {
  const code = getCountryCode(country);

  return (
    <svg
      aria-label={`${country || 'Unknown country'} flag`}
      className="mr-2 inline-block h-5 w-7 shrink-0 align-middle rounded-sm shadow-sm ring-1 ring-black/10"
      role="img"
      viewBox="0 0 28 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{country || 'Unknown country'}</title>
      {code === 'NG' ? (
        <>
          <rect width="9.33" height="20" fill="#008751" />
          <rect x="9.33" width="9.34" height="20" fill="#fff" />
          <rect x="18.67" width="9.33" height="20" fill="#008751" />
        </>
      ) : code === 'GH' ? (
        <>
          <rect width="28" height="20" fill="#006B3F" />
          <rect width="28" height="6.67" fill="#CE1126" />
          <rect y="6.67" width="28" height="6.66" fill="#FCD116" />
          <path
            d="m14 7.7 1.1 3.1 3.3.1-2.6 2 1 3.1-2.8-1.8-2.8 1.8 1-3.1-2.6-2 3.3-.1z"
            fill="#000"
          />
        </>
      ) : code === 'RW' ? (
        <>
          <rect width="28" height="20" fill="#20603D" />
          <rect width="28" height="10" fill="#00A1DE" />
          <rect y="10" width="28" height="5" fill="#FAD201" />
          <circle cx="22" cy="5" r="2.1" fill="#E5BE01" />
        </>
      ) : code === 'KE' ? (
        <>
          <rect width="28" height="20" fill="#006600" />
          <rect width="28" height="6.1" fill="#000" />
          <rect y="6.1" width="28" height="1.2" fill="#fff" />
          <rect y="7.3" width="28" height="5.4" fill="#BB0000" />
          <rect y="12.7" width="28" height="1.2" fill="#fff" />
          <path
            d="M14 5.4c-3.8 2.8-3.8 6.5 0 9.2 3.8-2.7 3.8-6.4 0-9.2Z"
            fill="#fff"
          />
          <path
            d="M14 6.2c-2.7 2.5-2.7 5.1 0 7.6 2.7-2.5 2.7-5.1 0-7.6Z"
            fill="#BB0000"
          />
          <path
            d="M13.5 5.6 9.5 2.5m5 3.1 4-3.1m-5 9.4-4 3.1m5-3.1 4 3.1"
            stroke="#fff"
            strokeWidth=".7"
          />
        </>
      ) : (
        <>
          <rect width="28" height="20" fill="#e2e8f0" />
          <circle cx="14" cy="10" r="5.5" fill="#94a3b8" />
          <path
            d="M14 6.7v3.7l2.4 1.5"
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeWidth="1.3"
          />
        </>
      )}
    </svg>
  );
};

export default CountryFlag;
