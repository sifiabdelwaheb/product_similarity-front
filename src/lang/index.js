import { addLocaleData } from 'react-intl';
import enLang from './entries/en-US';
import deLang from './entries/de-DE';
import frLang from './entries/fr-FR';

const AppLocale = {
	en: enLang,
	de: deLang,
	fr: frLang
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.de.data);
addLocaleData(AppLocale.fr.data);

export default AppLocale;
