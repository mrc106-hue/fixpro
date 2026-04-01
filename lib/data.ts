// FixPro — datos estáticos del ecosistema español

export const SECTORES = [
  { id: 'fontaneria',         label: 'Fontanería',         emoji: '🔧', icon: 'wrench' },
  { id: 'electricidad',       label: 'Electricidad',       emoji: '⚡', icon: 'zap' },
  { id: 'reformas',           label: 'Reformas Integrales',emoji: '🏗️', icon: 'hammer' },
  { id: 'carpinteria',        label: 'Carpintería',        emoji: '🪵', icon: 'ruler' },
  { id: 'cerrajeria',         label: 'Cerrajería',         emoji: '🔑', icon: 'key' },
  { id: 'pintura',            label: 'Pintura',            emoji: '🎨', icon: 'paintbrush' },
  { id: 'climatizacion',      label: 'Climatización',      emoji: '❄️', icon: 'wind' },
  { id: 'informatica',        label: 'Informática',        emoji: '💻', icon: 'monitor' },
  { id: 'jardineria',         label: 'Jardinería',         emoji: '🌿', icon: 'leaf' },
  { id: 'limpieza',           label: 'Limpieza',           emoji: '🧹', icon: 'sparkles' },
  { id: 'mudanzas',           label: 'Mudanzas',           emoji: '📦', icon: 'package' },
  { id: 'albanileria',        label: 'Albañilería',        emoji: '🧱', icon: 'layers' },
  { id: 'placas-solares',     label: 'Placas Solares',     emoji: '☀️', icon: 'sun' },
  { id: 'aerotermia',         label: 'Aerotermia',         emoji: '🌡️', icon: 'thermometer' },
  { id: 'electrodomesticos',  label: 'Electrodomésticos',  emoji: '🔌', icon: 'plug' },
  { id: 'cristaleria',        label: 'Cristalería',        emoji: '🪟', icon: 'square' },
  { id: 'suelos',             label: 'Suelos y Parquet',   emoji: '🏠', icon: 'home' },
  { id: 'impermeabilizacion', label: 'Impermeabilización', emoji: '💧', icon: 'droplets' },
  { id: 'pladur',             label: 'Pladur / Techos',    emoji: '🏛️', icon: 'layout' },
  { id: 'mecanica',           label: 'Mecánica',           emoji: '🚗', icon: 'settings' },
]

export const COMUNIDADES = [
  { id: 'andalucia',         label: 'Andalucía',           provincias: ['Almería','Cádiz','Córdoba','Granada','Huelva','Jaén','Málaga','Sevilla'] },
  { id: 'aragon',            label: 'Aragón',              provincias: ['Huesca','Teruel','Zaragoza'] },
  { id: 'asturias',          label: 'Asturias',            provincias: ['Asturias'] },
  { id: 'baleares',          label: 'Baleares',            provincias: ['Baleares'] },
  { id: 'canarias',          label: 'Canarias',            provincias: ['Las Palmas','Santa Cruz de Tenerife'] },
  { id: 'cantabria',         label: 'Cantabria',           provincias: ['Cantabria'] },
  { id: 'castilla-la-mancha',label: 'Castilla-La Mancha',  provincias: ['Albacete','Ciudad Real','Cuenca','Guadalajara','Toledo'] },
  { id: 'castilla-leon',     label: 'Castilla y León',     provincias: ['Ávila','Burgos','León','Palencia','Salamanca','Segovia','Soria','Valladolid','Zamora'] },
  { id: 'cataluna',          label: 'Cataluña',            provincias: ['Barcelona','Girona','Lleida','Tarragona'] },
  { id: 'extremadura',       label: 'Extremadura',         provincias: ['Badajoz','Cáceres'] },
  { id: 'galicia',           label: 'Galicia',             provincias: ['A Coruña','Lugo','Ourense','Pontevedra'] },
  { id: 'la-rioja',          label: 'La Rioja',            provincias: ['La Rioja'] },
  { id: 'madrid',            label: 'Madrid',              provincias: ['Madrid'] },
  { id: 'murcia',            label: 'Murcia',              provincias: ['Murcia'] },
  { id: 'navarra',           label: 'Navarra',             provincias: ['Navarra'] },
  { id: 'pais-vasco',        label: 'País Vasco',          provincias: ['Álava','Gipuzkoa','Bizkaia'] },
  { id: 'valencia',          label: 'C. Valenciana',       provincias: ['Alicante','Castellón','Valencia'] },
]

export const TODAS_PROVINCIAS = COMUNIDADES.flatMap(c => c.provincias)

export const PLANES = [
  {
    id:        'gratis',
    label:     'Gratis',
    precio:    0,
    color:     '#666',
    features:  ['Listing básico', 'Nombre y teléfono', 'Sin foto ni descripción', 'Al final de la lista'],
  },
  {
    id:        'estandar',
    label:     'Estándar',
    precio:    29,
    color:     '#5B8DEF',
    priceId:   process.env.STRIPE_PRICE_ESTANDAR || '',
    features:  ['Foto de perfil', 'Descripción 200 palabras', 'Botón WhatsApp', 'Hasta 5 fotos', 'Posición media'],
  },
  {
    id:        'premium',
    label:     'Premium',
    precio:    69,
    color:     '#FF6B00',
    priceId:   process.env.STRIPE_PRICE_PREMIUM || '',
    features:  ['Todo lo anterior', 'Galería 20 fotos', 'Badge Verificado', 'Posición destacada en provincia', 'Pin naranja en mapa', '10 leads/mes'],
    popular:   true,
  },
  {
    id:        'vip',
    label:     'VIP',
    precio:    99,
    color:     '#FFB800',
    priceId:   process.env.STRIPE_PRICE_VIP || '',
    features:  ['Todo lo anterior', 'Posición nº1 en sector+provincia', 'Pin dorado en mapa', 'Aparece en portada', 'Leads ilimitados', 'Badge animado'],
  },
]

export const MOCK_PROFESIONALES = [
  { id: '1', nombre: 'Fontanería García', sector: 'fontaneria', provincia: 'Madrid', plan: 'vip', valoracion: 4.9, total_val: 127, foto: null, whatsapp: '34600000001', descripcion: 'Más de 15 años de experiencia en fontanería residencial e industrial. Urgencias 24h.' },
  { id: '2', nombre: 'Electricidad Torres', sector: 'electricidad', provincia: 'Barcelona', plan: 'vip', valoracion: 4.8, total_val: 89, foto: null, whatsapp: '34600000002', descripcion: 'Instalaciones eléctricas, cuadros eléctricos, domótica. Certificados REE.' },
  { id: '3', nombre: 'Reformas Sánchez', sector: 'reformas', provincia: 'Valencia', plan: 'premium', valoracion: 4.7, total_val: 64, foto: null, whatsapp: '34600000003', descripcion: 'Reformas integrales de cocinas, baños y locales comerciales. Presupuesto sin compromiso.' },
  { id: '4', nombre: 'Cerrajería 24h López', sector: 'cerrajeria', provincia: 'Sevilla', plan: 'premium', valoracion: 4.9, total_val: 203, foto: null, whatsapp: '34600000004', descripcion: 'Apertura de puertas, cambio de cerraduras, instalación de cajas fuertes. 24 horas.' },
  { id: '5', nombre: 'Pintura Martínez Pro', sector: 'pintura', provincia: 'Málaga', plan: 'estandar', valoracion: 4.6, total_val: 41, foto: null, whatsapp: '34600000005', descripcion: 'Pintura interior y exterior. Trabajos de calidad con garantía de 2 años.' },
  { id: '6', nombre: 'Clima Expert Sur', sector: 'climatizacion', provincia: 'Granada', plan: 'premium', valoracion: 4.8, total_val: 76, foto: null, whatsapp: '34600000006', descripcion: 'Instalación y mantenimiento de aire acondicionado. Todas las marcas.' },
]
