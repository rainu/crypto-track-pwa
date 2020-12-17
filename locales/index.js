import "numeral/locales/de"  //initialise all available numeral locales

const localeMappings = {
  'de': require('./de.json'),
  'en': require('./en.json')
}

export default {
  locales: Object.keys(localeMappings),
  localeMappings,
  defaultLocale: 'en'
}
