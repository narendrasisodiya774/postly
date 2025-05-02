import { useRouter } from 'next/router';

const LanguageSwitcher = () => {
  const { locale, locales, asPath } = useRouter();

  const switchLanguage = (lang: string) => {
    window.location.href = `/${lang}${asPath}`;
  };

  return (
    <div style={{position:'absolute', right:'0px'}}>
      {locales?.map((lng) => (
        <button
          key={lng}
          onClick={() => switchLanguage(lng)}
          style={{
            marginRight: '10px',
            backgroundColor: lng === locale ? '#0070f3' : '#ccc',
            color: '#fff',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {lng === 'en' ? 'English' : 'Français'}
        </button>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
