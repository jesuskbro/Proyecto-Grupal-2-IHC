// ── Theme ──
function toggleTheme(){const t=document.documentElement.getAttribute('data-theme')==='dark'?'light':'dark';document.documentElement.setAttribute('data-theme',t);document.querySelectorAll('.theme-btn:not(.lang-btn)').forEach(b=>b.textContent=t==='dark'?'☀️':'🌙');}

// ── Menu ──
function toggleMenu(){const nav=document.getElementById('navLinks');nav.style.display=nav.style.display==='flex'?'none':'flex';}

// ── Waveform ──
const wf=document.getElementById('waveform');
if(wf){for(let i=0;i<28;i++){const b=document.createElement('div');b.className='wave-bar';b.style.height=(20+Math.random()*80)+'%';b.style.animationDelay=(Math.random()*.8)+'s';b.style.animationDuration=(.5+Math.random()*.6)+'s';wf.appendChild(b);}
setInterval(()=>{wf.querySelectorAll('.wave-bar').forEach(b=>{b.style.height=(20+Math.random()*80)+'%';});const v=68+Math.floor(Math.random()*20);const el=document.getElementById('liveDb');if(el)el.textContent=v;},900);}

// ── Toast ──
let toastTimeout;
function showToast(msg){const t=document.getElementById('toast');t.textContent=msg;t.style.display='block';t.classList.remove('hide');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>{t.classList.add('hide');setTimeout(()=>{t.style.display='none';},300);},3000);}

// ── Login modal ──
let pendingSeg='ciudadano';
function openLogin(seg){if(seg)selectSegment(seg);document.getElementById('loginModal').classList.add('active');document.body.style.overflow='hidden';}
function closeLogin(){document.getElementById('loginModal').classList.remove('active');document.body.style.overflow='';}
document.getElementById('loginModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeLogin();});
function selectSegment(seg){pendingSeg=seg;document.querySelectorAll('.seg-chip').forEach(c=>c.classList.remove('active'));const chip=document.getElementById('chip-'+seg);if(chip)chip.classList.add('active');}
function highlightSegment(seg){
  document.querySelectorAll('.hsp-btn').forEach(c=>c.classList.remove('active'));
  const chip=document.getElementById('chip-hero-'+seg);if(chip)chip.classList.add('active');
  const all=['ciudadano','trabajador','profesional'];
  const card=document.getElementById('seg-'+seg);if(!card)return;
  setTimeout(()=>{
    all.forEach(s=>{
      const c=document.getElementById('seg-'+s);if(!c)return;
      if(s===seg){c.classList.add('segment-highlight');c.classList.remove('dimmed');}
      else{c.classList.add('dimmed');}
    });
    setTimeout(()=>{
      card.classList.remove('segment-highlight');
      all.forEach(s=>{const c=document.getElementById('seg-'+s);if(c)c.classList.remove('dimmed');});
    },2200);
  },400);
}

// Visibilidad continua del CTA principal al hacer scroll (IHC: acción clave siempre accesible)
(function(){
  const stickyCta=document.getElementById('stickyCta');
  const hero=document.getElementById('inicio');
  if(!stickyCta||!hero)return;
  window.addEventListener('scroll',()=>{
    const heroBottom=hero.getBoundingClientRect().bottom;
    if(heroBottom<0)stickyCta.classList.add('show');
    else stickyCta.classList.remove('show');
  });
})();
selectSegment('ciudadano');

function updateEmailDisplay(val){const d=document.getElementById('loginEmailDisplay');if(val.length>3){d.textContent='👤 Signed in as: '+val;d.classList.add('show');}else{d.classList.remove('show');}}

// ── Enter dashboard ──
function enterDash(){
  const nombreEl=document.getElementById('loginNombre');
  const apellidoEl=document.getElementById('loginApellido');
  const emailEl=document.getElementById('loginEmail');
  const passEl=document.getElementById('loginPass');
  const errEl=document.getElementById('loginError');

  // Validaciones
  const nombre=(nombreEl.value||'').trim();
  const apellido=(apellidoEl.value||'').trim();
  const email=(emailEl.value||'').trim();
  const pass=(passEl.value||'').trim();

  errEl.style.display='none';

  if(!nombre){
    errEl.textContent='⚠️ Please enter your first name.';
    errEl.style.display='block';
    nombreEl.focus();return;
  }
  if(!apellido){
    errEl.textContent='⚠️ Please enter your last name.';
    errEl.style.display='block';
    apellidoEl.focus();return;
  }
  if(!email){
    errEl.textContent='⚠️ Please enter your email address.';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  if(!email.includes('@')){
    errEl.textContent='⚠️ The email entered is not valid. It must include the "@" symbol (example: user@email.com).';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  const emailParts=email.split('@');
  if(emailParts.length!==2||!emailParts[0]||!emailParts[1]||!emailParts[1].includes('.')){
    errEl.textContent='⚠️ The email format is not valid. Correct example: user@email.com';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  if(!pass||pass.length<6){
    errEl.textContent='⚠️ The password must be at least 6 characters long.';
    errEl.style.display='block';
    passEl.focus();return;
  }

  closeLogin();
  document.getElementById('landing').style.display='none';
  const dash=document.getElementById('dashboard');
  dash.classList.add('active');
  window.scrollTo(0,0);

  const fullName=nombre+' '+apellido;
  const segLabels={ciudadano:'Citizen',trabajador:'Worker',profesional:'Health Professional'};
  const subs={ciudadano:'Monitor your daily sound exposure in Lima',trabajador:'Occupational exposure record — Law No. 29783',profesional:'Clinical follow-up of patients exposed to noise'};
  const initials=(nombre[0]||'')+(apellido[0]||'');

  document.getElementById('dashAvatar').textContent=initials.toUpperCase();
  document.getElementById('dashUserLabel').textContent=fullName;
  document.getElementById('dashGreet').textContent='👋 Welcome, '+nombre;
  document.getElementById('dashSub').textContent=subs[pendingSeg]||'';
  document.getElementById('profileAvatarLg').textContent=initials.toUpperCase();
  document.getElementById('profileName').textContent=fullName;
  document.getElementById('profileEmail').textContent=email;
  document.getElementById('pfNombre').value=nombre;
  document.getElementById('pfApellido').value=apellido;
  document.getElementById('pfEmail').value=email;
  document.getElementById('pfSegmento').value=segLabels[pendingSeg]||'Citizen';

  document.querySelectorAll('.seg-dash').forEach(d=>d.classList.remove('active'));
  const target=document.getElementById('dash-'+pendingSeg);
  if(target)target.classList.add('active');

  // Cada perfil ve solo su propia lista de zonas (dashboards independientes)
  document.querySelectorAll('.zones-wrap').forEach(z=>z.style.display='none');
  const zoneIds={ciudadano:'zonesCiudadano',trabajador:'zonesTrabajador',profesional:'zonesProfesional'};
  const activeZones=document.getElementById(zoneIds[pendingSeg]);
  if(activeZones)activeZones.style.display='flex';

  showDashPanel('panel');
  requestMicAccess();
}

function backToLanding(){
  document.getElementById('landing').style.display='';
  document.getElementById('dashboard').classList.remove('active');
  document.querySelectorAll('.seg-dash').forEach(d=>d.classList.remove('active'));
  window.scrollTo(0,0);
}

// ── Full i18n translations ──
const i18n={
  es:{
    nav_inicio:'Inicio',nav_problema:'Problema',nav_beneficios:'Beneficios',nav_funcionalidades:'Funcionalidades',nav_planes:'Planes',nav_faq:'Preguntas frecuentes',nav_contacto:'Contacto',nav_login:'Iniciar sesión',
    hero_eyebrow:'🔊 Protección auditiva inteligente',hero_h1_l1:'Tus oídos no te avisan',hero_h1_l2:'cuando el ruido los daña.',hero_h1_l3:'AudioSafe sí.',
    dbx_c_lead:'¿Qué es un dB?',dbx_c_body:'El decibel (dB) mide qué tan fuerte es un sonido. Desde 65 dB tu oído empieza a esforzarse; por encima de 85 dB sostenidos, el ruido puede dañar tu audición.',
    dbx_w_lead:'¿Qué es un dB?',dbx_w_body:'El decibel (dB) mide la intensidad del sonido. SUNAFIL establece 85 dB como el límite seguro de exposición ocupacional durante una jornada de 8 horas.',
    dbx_p_lead:'¿Qué es un dB?',dbx_p_body:'El decibel (dB) mide la intensidad del sonido en una escala logarítmica: cada +10 dB se percibe como aproximadamente el doble de fuerte. La OMS recomienda no superar 53 dB en zonas urbanas.',
    hero_p:'AudioSafe mide los niveles sonoros en tiempo real, genera mapas colaborativos y emite alertas personalizadas para que cuides tu salud auditiva en entornos urbanos y laborales de Lima.',
    hero_btn_start:'Comenzar ahora',hero_btn_how:'Cómo funciona',
    hero_stat1_label:'umbral de riesgo laboral',hero_stat2_label:'monitoreo en tiempo real',hero_stat3_label:'segmentos atendidos',
    label_current_level:'Nivel sonoro actual',label_live:'EN VIVO',
    metric_exposure:'Exposición',metric_zone:'Zona',metric_risk:'Riesgo',zone_moderate:'Moderada',risk_medium:'Medio',
    float_alert_title:'⚠️ Alerta preventiva',float_alert_body:'Nivel supera 75 dB. Considera usar protección auditiva.',
    problem_eyebrow:'Problemática',problem_h2:'El ruido afecta a millones sin que lo noten',
    problem_p:'Lima registra niveles de 75–85 dB en avenidas principales, muy por encima del límite recomendado de 53 dB. El daño auditivo es silencioso y acumulativo.',
    prob_c1_h:'Daño invisible',prob_c1_p:'La pérdida auditiva por ruido no duele al principio y se detecta tarde, cuando el daño ya es permanente.',
    prob_c2_h:'Ciudades ruidosas',prob_c2_p:'Más del 60% de la población urbana peruana vive en zonas con tráfico intenso y niveles de ruido peligrosos.',
    prob_c3_h:'Riesgo laboral',prob_c3_p:'1 de cada 3 trabajadores en el mundo está expuesto a ruido superior a 85 dB durante su jornada laboral.',
    prob_c4_h:'Diagnóstico tardío',prob_c4_p:'Los médicos no cuentan con datos objetivos de exposición histórica de sus pacientes para evaluar el riesgo real.',
    prob_c5_h:'Sin herramientas accesibles',prob_c5_p:'Las soluciones existentes son o demasiado técnicas o carecen de alertas personalizadas y mapas colaborativos.',
    prob_c6_h:'Crecimiento del problema',prob_c6_p:'Para el 2050, más de 2,500 millones de personas tendrán algún grado de pérdida auditiva (OMS, 2021).',
    benefit_eyebrow:'Beneficios',benefit_h2:'Una experiencia pensada para cada usuario',
    benefit_p:'AudioSafe adapta su valor a ciudadanos, trabajadores y profesionales de salud que necesitan gestionar su exposición sonora.',
    seg1_h:'Ciudadanos urbanos',seg1_p:'Personas entre 18–60 años expuestas crónicamente al ruido de la ciudad.',
    seg1_li1:'Medición en tiempo real desde el smartphone.',seg1_li2:'Alertas cuando superas umbrales de riesgo.',seg1_li3:'Mapa de zonas ruidosas en tu ruta diaria.',seg1_li4:'Recomendaciones para proteger tu audición.',
    seg1_btn:'Ver dashboard ciudadano',
    seg2_h:'Trabajadores en zonas ruidosas',seg2_p:'Operarios, mecánicos, músicos y empleados en entornos con ruido laboral sostenido.',
    seg2_li1:'Registro verificable de exposición diaria.',seg2_li2:'Alertas cuando superas el límite de 85 dB.',seg2_li3:'Historial exportable para uso médico-laboral.',seg2_li4:'Cumplimiento de normativa SUNAFIL / Ley 29783.',
    seg2_note:'ℹ️ SUNAFIL es el organismo peruano que fiscaliza la seguridad laboral; la Ley N° 29783 establece los límites legales de exposición al ruido en el trabajo.',
    seg2_btn:'Ver dashboard trabajador',
    seg3_h:'Profesionales de salud',seg3_p:'Médicos ORL, neurólogos y personal de salud ocupacional de clínicas.',
    seg3_li1:'Historial de exposición de sus pacientes.',seg3_li2:'Informes exportables para diagnóstico clínico.',seg3_li3:'Análisis de zonas críticas por área geográfica.',seg3_li4:'Panel de seguimiento longitudinal auditivo.',
    seg3_btn:'Ver dashboard profesional',seg_featured:'Más completo',
    glance_msg:'restantes en esta zona antes de tu descanso auditivo obligatorio',
    glance_sub:'Nivel actual: 92 dB · Zona crítica (límite SUNAFIL: 85 dB)',
    glance_show:'📊 Ver panel detallado',glance_hide:'✕ Ocultar panel detallado',
    feature_eyebrow:'Funcionalidades',feature_h2:'Todo lo necesario para proteger tu audición',
    feat1_h:'Medición en tiempo real',feat1_p:'Niveles de ruido precisos usando el micrófono de tu dispositivo, sin hardware adicional.',
    feat2_h:'Mapas colaborativos',feat2_p:'Visualiza zonas de ruido en Lima generadas por la comunidad de usuarios.',
    feat3_h:'Alertas inteligentes',feat3_p:'Notificaciones personalizadas cuando los niveles sonoros superen tus umbrales configurados.',
    feat4_h:'Panel visual',feat4_p:'Dashboard adaptado a tu segmento con métricas, gráficos y estado de exposición.',
    feat5_h:'Historial exportable',feat5_p:'Registros de exposición descargables en PDF para médicos, empleadores o autoridades.',
    feat6_h:'Dosis de exposición',feat6_p:'Calcula tu dosis diaria de ruido y te avisa cuándo pausar o usar protección auditiva.',
    feat7_h:'Análisis avanzado',feat7_p:'Espectrogramas, nivel equivalente de ruido (Leq) y métricas profesionales para expertos.',
    feat8_h:'Gestión institucional',feat8_p:'Convenios con municipalidades y centros de salud para análisis de zonas críticas.',
    feat9_h:'Acceso multiplataforma',feat9_p:'Disponible en web, iOS y Android. Sincronización automática entre dispositivos.',
    how_eyebrow:'¿Cómo funciona?',how_h2:'En 4 pasos sencillos',
    step1_h:'Crea tu cuenta',step1_p:'Regístrate y selecciona tu perfil: ciudadano, trabajador o profesional.',
    step2_h:'Activa el micrófono',step2_p:'AudioSafe usa el micrófono de tu smartphone para capturar el entorno sonoro.',
    step3_h:'Monitorea en vivo',step3_p:'Ve los niveles de ruido en tiempo real y recibe alertas cuando superes los límites.',
    step4_h:'Genera informes',step4_p:'Exporta tu historial en PDF para uso médico, laboral o personal.',
    plans_eyebrow:'Planes',plans_h2:'Elige el plan para tu necesidad',
    plan1_h:'Gratuito',plan1_p:'Para empezar a medir y entender tu exposición.',
    plan1_li1:'Medición básica en tiempo real.',plan1_li2:'Alertas simples de umbral.',plan1_li3:'Acceso al mapa colaborativo.',plan1_li4:'Historial de los últimos 7 días.',
    plan1_btn:'Empezar gratis',
    plan2_h:'Premium',plan2_p:'Para ciudadanos y trabajadores que necesitan más control.',plan2_price:'S/ 12.90',plan2_period:'/ mes',
    plan2_li1:'Historial ilimitado y exportable.',plan2_li2:'Alertas personalizadas avanzadas.',plan2_li3:'Análisis de dosis diaria / semanal.',plan2_li4:'Reportes PDF para médico o empleador.',plan2_li5:'Soporte prioritario.',
    plan2_btn:'Iniciar sesión',popular_tag:'Más elegido',
    plan3_h:'Institucional',plan3_p:'Para clínicas, empresas y municipalidades.',plan3_price:'A medida',
    plan3_li1:'Panel multi-usuario y multi-sede.',plan3_li2:'Reportes analíticos por zona geográfica.',plan3_li3:'Integración con sistemas de salud ocupacional.',plan3_li4:'Convenio con SUNAFIL / municipalidades.',plan3_li5:'Soporte dedicado.',
    plan3_btn:'Solicitar información',
    faq_eyebrow:'Preguntas frecuentes',faq_h2:'Resuelve tus dudas antes de empezar',
    faq1_q:'¿Necesito un dispositivo especial para medir el ruido?',faq1_a:'No. AudioSafe usa el micrófono integrado de tu smartphone para medir los niveles sonoros. No requiere hardware adicional.',
    faq2_q:'¿Qué tan precisas son las mediciones?',faq2_a:'Las mediciones tienen una precisión de ±2–3 dB comparadas con sonómetros profesionales. Para contextos clínicos o legales, recomendamos complementar con equipo certificado.',
    faq3_q:'¿AudioSafe sirve para cumplir con la normativa SUNAFIL?',faq3_a:'Sí. Los registros exportables de exposición diaria y el historial verificable son un apoyo para demostrar el monitoreo de riesgo ocupacional ante inspecciones.',
    faq4_q:'¿Mis datos de ubicación y salud son privados?',faq4_a:'Sí. Tus datos personales y de ubicación nunca se comparten con terceros sin tu consentimiento explícito. Los datos del mapa colaborativo se comparten de forma anónima y agregada.',
    faq5_q:'¿Puedo usar AudioSafe como profesional de salud para mis pacientes?',faq5_a:'Sí. El segmento de profesionales incluye un panel de pacientes con historial de exposición, informes exportables y análisis longitudinal diseñado para uso clínico.',
    faq6_q:'¿Funciona en zonas sin conexión a internet?',faq6_a:'AudioSafe puede capturar datos de forma offline y sincronizarlos cuando recuperes la conexión. El mapa colaborativo requiere conexión para actualizar datos de otros usuarios.',
    contact_eyebrow:'Contacto',contact_heading:'¿Tienes alguna consulta?',contact_p:'Estamos aquí para ayudarte. Escríbenos y te respondemos en menos de 24 horas.',
    contact_talk_h:'Hablemos',contact_talk_p:'Nuestro equipo está listo para orientarte sobre la plataforma, planes institucionales o integraciones personalizadas.',
    contact_hours:'Lun–Vie: 9:00am – 6:00pm',
    contact_inst_h:'🏥 ¿Eres una institución?',contact_inst_p:'Contáctanos para conocer nuestros convenios con municipalidades, clínicas y empresas industriales de Lima.',
    contact_f_name:'Nombre',contact_f_lastname:'Apellido',contact_f_email:'Correo electrónico',contact_f_subject:'Asunto',contact_f_msg:'Mensaje',contact_f_send:'Enviar mensaje',
    contact_ph_name:'Tu nombre',contact_ph_lastname:'Tu apellido',contact_ph_email:'tu@correo.com',contact_ph_msg:'Escribe tu mensaje aquí...',
    contact_opt1:'Consulta general',contact_opt2:'Plan institucional',contact_opt3:'Soporte técnico',contact_opt4:'Convenio municipal',
    cta_h2:'Empieza a proteger tu audición hoy',cta_p:'Únete a la plataforma de monitoreo sonoro más completa de Lima. Mide, alerta y actúa antes de que el daño sea permanente.',cta_btn:'Iniciar sesión',
    footer_product:'Producto',footer_company:'Empresa',footer_legal:'Legal',
    footer_copy:'© 2026 AudioSafe – Startup UPC IHC & Tecnologías Móviles. Todos los derechos reservados.',
    modal_welcome:'Bienvenido a AudioSafe',modal_sub:'Inicia sesión para acceder al dashboard.',
    modal_name:'Nombre',modal_lastname:'Apellido',modal_email:'Correo electrónico',modal_pass:'Contraseña',
    modal_ph_name:'Tu nombre',modal_ph_lastname:'Tu apellido',modal_ph_email:'tu@correo.com',
    modal_profile_q:'¿Cuál es tu perfil?',
    chip_ciudadano:'🏙️ Ciudadano',chip_trabajador:'⚙️ Trabajador',chip_profesional:'🩺 Profesional',
    modal_btn_login:'Iniciar sesión',
    dash_panel:'📊 Panel',dash_mapa:'🗺️ Mapa',dash_historial:'📁 Historial',dash_alertas:'🔔 Alertas',dash_configurar:'⚙️ Configurar',dash_perfil:'👤 Mi Perfil',dash_exit:'← Salir',
    dash_greeting:'Panel de control',
    btn_stop:'⏹ Detener monitoreo',btn_start:'▶️ Iniciar monitoreo',btn_report:'📊 Exportar CSV',btn_export_pdf:'📄 Exportar informe (PDF)',btn_share:'📍 Compartir ubicación',
    mic_error:'No pudimos acceder a tu micrófono. Activa los permisos en la configuración de tu navegador.',mic_retry:'🔄 Reintentar',
    kpi_c1:'Nivel actual',kpi_c2:'Exposición hoy',kpi_c3:'Alertas activas',kpi_c4:'Dosis semanal',
    kpi_c1_trend:'↑ Por encima del límite',kpi_c2_sub:'De 8h máximo',kpi_c3_trend:'↑ 1 nueva hoy',kpi_c4_trend:'↓ Bajo control',
    chart_today:'Historial — últimas 12h',tag_today:'HOY',
    panel_recent_alerts:'Alertas recientes',
    alert1_p:'Nivel crítico detectado',alert1_s:'95 dB · Av. Javier Prado · hace 2h',
    alert2_p:'Zona moderadamente ruidosa',alert2_s:'72 dB · Miraflores · hace 4h',
    alert3_p:'Nivel seguro',alert3_s:'48 dB · Parque Kennedy · hace 6h',
    panel_map:'Mapa de zonas — Lima',map_legend1:'Seguro <65dB',map_legend2:'Moderado 65–85dB',map_legend3:'Crítico >85dB',map_last_update:'Última actualización: hace 2 min',
    panel_recs:'Recomendaciones',
    rec1_p:'Usa tapones auditivos',rec1_s:'Si estarás más de 1h en zona de alto ruido.',
    rec2_p:'Toma un descanso auditivo',rec2_s:'Evita auriculares por las próximas 2 horas.',
    rec3_p:'Ruta alternativa disponible',rec3_s:'Av. Arequipa: nivel promedio 58 dB.',
    kpi_w1:'Exposición actual',kpi_w2:'Dosis diaria',kpi_w3:'Tiempo en zona crítica',kpi_w4:'Días sin riesgo',
    kpi_w1_trend:'↑ Supera límite (85 dB)',kpi_w2_trend:'↑ Riesgo alto',kpi_w3_trend:'↑ De 8h máximo',kpi_w4_trend:'↓ Esta semana',
    chart_week:'Registro de exposición — Semana',days_short:'Lun,Mar,Mié,Jue,Vie,Sáb,Dom',
    warn_box:'⚠️ Miércoles y jueves superaron el límite. Se recomienda descanso auditivo el fin de semana.',
    panel_dose:'Dosis acumulada',dose_label:'Dosis diaria acumulada',
    panel_sunafil:'Historial SUNAFIL',tag_verif:'VERIFICABLE',
    th_date:'Fecha',th_max:'Nivel máx.',th_dose:'Dosis',th_time:'Tiempo',th_status:'Estado',th_avg:'Nivel prom.',th_exptime:'Tiempo exposición',
    btn_export_csv:'📊 Exportar CSV',
    kpi_p1:'Pacientes activos',kpi_p2:'En riesgo auditivo',kpi_p3:'Reportes generados',kpi_p4:'Nivel promedio zona',
    kpi_p1_trend:'↑ 3 nuevos esta semana',kpi_p2_trend:'↑ Requieren atención',kpi_p3_sub:'Este mes',kpi_p4_trend:'↑ Zona industrial Norte',
    panel_patients:'Panel de pacientes',tag_clinical:'CLÍNICO',
    th_patient:'Paciente',th_sector:'Sector',th_exposure:'Exposición',th_risk:'Riesgo',
    panel_risk_dist:'Distribución por riesgo',
    riskdist_critical:'Crítico (>90 dB)',riskdist_high:'Alto (85–90 dB)',riskdist_moderate:'Moderado (65–85 dB)',riskdist_safe:'Seguro (<65 dB)',
    label_patient:'paciente',label_patients:'pacientes',
    btn_gen_report:'📊 Generar informe institucional (CSV)',
    panel_hist_compare:'📈 Comparación histórica de niveles',tag_6months:'6 MESES',
    legend_normal:'Normal <65 dB',legend_moderate_risk:'Riesgo moderado 65–85 dB',legend_high_risk:'Riesgo alto >85 dB',
    months_short:'Ene,Feb,Mar,Abr,May,Jun',
    chart_peak_prefix:'⚠️ Pico:',
    hist_compare_caption:'Comparación del nivel promedio (izquierda) frente al nivel máximo (derecha) reportado por los pacientes cada mes. Pasa el cursor sobre cada barra para ver el detalle y el nivel de riesgo.',
    tt_avg:'promedio',tt_max:'máx.',
    tt_risk_normal:'Normal',tt_risk_moderate:'Riesgo moderado',tt_risk_high:'Riesgo alto',
    panel_prevent:'🩺 Recomendaciones preventivas',
    prevent1_p:'Protección auditiva obligatoria',prevent1_s:'Recomendar tapones o auriculares certificados para exposiciones >85 dB.',
    prevent2_p:'Descansos auditivos programados',prevent2_s:'Sugerir descansos de 15 min cada 2h en ambientes ruidosos.',
    prevent3_p:'Audiometría periódica',prevent3_s:'Chequeo anual para pacientes con dosis recurrente >80%.',
    prevent4_p:'Derivación a especialista ORL',prevent4_s:'Los pacientes en riesgo crítico deben ser evaluados dentro de 7 días.',
    toast_updating_map:'🔄 Actualizando puntos del mapa...',
    map_panel_title:'🗺️ Mapa de ruido — Lima Metropolitana',tag_live:'EN VIVO',
    btn_refresh:'🔄 Actualizar',btn_add_point:'📍 Agregar mi punto',btn_export_map:'📥 Exportar mapa',
    add_point_hint:'📍 Haz clic en el mapa para colocar tu punto',map_last_update:'Última actualización: hace 2 min',
    hist_title:'📁 Historial de exposición completo',tag_30days:'30 DÍAS',
    btn_filter_date:'📅 Filtrar por fecha',btn_clear_filter:'✕ Limpiar filtro',
    kpi_a1:'Alertas hoy',kpi_a2:'Esta semana',kpi_a3:'Zonas críticas',kpi_a4:'Nivel máximo hoy',
    kpi_a1_trend:'↑ 2 críticas',kpi_a2_trend:'↑ 4 resueltas',kpi_a3_trend:'↑ Lima Norte',kpi_a4_trend:'↑ Javier Prado',
    alerts_center_title:'🔔 Centro de alertas',tag_active:'ACTIVAS',
    btn_mark_read:'✓ Marcar todo como leído',btn_config_alerts:'⚙️ Configurar alertas',
    falert1_p:'🚨 CRÍTICO — Nivel 96 dB detectado',falert1_s:'Av. Javier Prado Este · hace 15 min · Tu ubicación actual',
    falert2_p:'⚠️ Dosis diaria superó el 85%',falert2_s:'Umbral personalizado alcanzado · hace 1h',
    falert3_p:'Zona moderada — Av. La Marina',falert3_s:'74 dB · hace 3h · Camino al trabajo',
    falert4_p:'✅ Nivel seguro detectado — Parque Kennedy',falert4_s:'48 dB · hace 6h',
    btn_resolve:'Resolver',btn_postpone:'Posponer',
    config_alerts_title:'🔔 Configurar alertas',
    cfg_threshold_h:'Umbral de alerta',cfg_threshold_s:'Nivel sonoro para notificar',
    cfg_push_h:'Alertas push',cfg_push_s:'Notificaciones del navegador',
    cfg_email_h:'Alertas por correo',cfg_email_s:'Resumen diario al email',
    cfg_night_h:'Modo silencio nocturno',cfg_night_s:'Sin alertas entre 10pm–7am',
    zones_title:'📍 Zonas de monitoreo',
    zone_active:'Activa',zone_moderate:'Moderado',zone_critical:'Crítico',
    status_high_risk:'Riesgo alto',status_exceeds_limit:'Supera el límite',status_moderate:'Moderado',status_safe:'Seguro',status_critical:'Crítico',status_high:'Alto',
    zone_ciu1_n:'📍 Casa',zone_ciu1_s:'Miraflores, Lima · 58 dB',
    zone_ciu2_n:'💼 Trabajo',zone_ciu2_s:'San Isidro, Lima · 78 dB',
    zone_ciu3_n:'🏋️ Gimnasio',zone_ciu3_s:'Surco, Lima · 91 dB',
    zone_trab1_n:'🏭 Planta de producción',zone_trab1_s:'Zona industrial, Ate · 92 dB',
    zone_trab2_n:'🔧 Taller de mantenimiento',zone_trab2_s:'Callao · 84 dB',
    zone_trab3_n:'🧰 Oficina administrativa',zone_trab3_s:'Callao · 58 dB',
    zone_prof1_n:'🏥 Consultorio ORL',zone_prof1_s:'Clínica San Felipe, Jesús María · 52 dB',
    zone_prof2_n:'🩺 Sala de espera',zone_prof2_s:'Clínica San Felipe · 68 dB',
    zone_prof3_n:'🏭 Visita a planta industrial',zone_prof3_s:'Zona industrial norte · 89 dB',
    btn_add_zone:'+ Agregar zona',
    prefs_title:'🎛️ Preferencias de la aplicación',pref_theme:'Tema',pref_lang:'Idioma',pref_unit:'Unidad de medida',
    btn_change_theme:'Cambiar tema',btn_save_prefs:'💾 Guardar preferencias',
    prof_activity_title:'📊 Resumen de tu actividad',prof_sessions:'Sesiones de monitoreo',prof_alerts_recv:'Alertas recibidas',prof_reports:'Informes generados',
    label_name:'Nombre',label_lastname:'Apellido',label_email:'Correo',label_phone:'Teléfono',label_city:'Ciudad',label_segment:'Segmento',
    btn_save_profile:'💾 Guardar cambios',btn_change_pass:'🔑 Cambiar contraseña',
  },
  en:{
    nav_inicio:'Home',nav_problema:'Problem',nav_beneficios:'Benefits',nav_funcionalidades:'Features',nav_planes:'Plans',nav_faq:'FAQ',nav_contacto:'Contact',nav_login:'Sign in',
    hero_eyebrow:'🔊 Smart hearing protection',hero_h1_l1:'Your ears don\'t warn you',hero_h1_l2:'when noise damages them.',hero_h1_l3:'AudioSafe does.',
    dbx_c_lead:'What is a dB?',dbx_c_body:'The decibel (dB) measures how loud a sound is. From 65 dB your ear starts to strain; above 85 dB sustained, noise can damage your hearing.',
    dbx_w_lead:'What is a dB?',dbx_w_body:'The decibel (dB) measures sound intensity. SUNAFIL sets 85 dB as the safe occupational exposure limit during an 8-hour workday.',
    dbx_p_lead:'What is a dB?',dbx_p_body:'The decibel (dB) measures sound intensity on a logarithmic scale: every +10 dB is perceived as roughly twice as loud. The WHO recommends not exceeding 53 dB in urban areas.',
    hero_p:'AudioSafe measures sound levels in real time, generates collaborative maps and sends personalized alerts to protect your hearing health in urban and work environments in Lima.',
    hero_btn_start:'Get started',hero_btn_how:'How it works',
    hero_stat1_label:'occupational risk threshold',hero_stat2_label:'real-time monitoring',hero_stat3_label:'segments served',
    label_current_level:'Current sound level',label_live:'LIVE',
    metric_exposure:'Exposure',metric_zone:'Zone',metric_risk:'Risk',zone_moderate:'Moderate',risk_medium:'Medium',
    float_alert_title:'⚠️ Preventive alert',float_alert_body:'Level exceeds 75 dB. Consider using hearing protection.',
    problem_eyebrow:'The Problem',problem_h2:'Noise affects millions without them noticing',
    problem_p:'Lima records levels of 75-85 dB on main avenues, well above the recommended limit of 53 dB. Hearing damage is silent and cumulative.',
    prob_c1_h:'Invisible damage',prob_c1_p:'Noise-induced hearing loss does not hurt at first and is detected late, when the damage is already permanent.',
    prob_c2_h:'Noisy cities',prob_c2_p:'More than 60% of the Peruvian urban population lives in areas with heavy traffic and dangerous noise levels.',
    prob_c3_h:'Occupational risk',prob_c3_p:'1 in 3 workers worldwide is exposed to noise above 85 dB during their workday.',
    prob_c4_h:'Late diagnosis',prob_c4_p:'Doctors lack objective historical exposure data about their patients to assess actual risk.',
    prob_c5_h:'No accessible tools',prob_c5_p:'Existing solutions are either too technical or lack personalized alerts and collaborative maps.',
    prob_c6_h:'Growing problem',prob_c6_p:'By 2050, more than 2.5 billion people will have some degree of hearing loss (WHO, 2021).',
    benefit_eyebrow:'Benefits',benefit_h2:'An experience designed for every user',
    benefit_p:'AudioSafe adapts its value to citizens, workers, and health professionals who need to manage their sound exposure.',
    seg1_h:'Urban citizens',seg1_p:'People between 18-60 years old chronically exposed to city noise.',
    seg1_li1:'Real-time measurement from your smartphone.',seg1_li2:'Alerts when you exceed risk thresholds.',seg1_li3:'Map of noisy zones on your daily route.',seg1_li4:'Recommendations to protect your hearing.',
    seg1_btn:'View citizen dashboard',
    seg2_h:'Workers in noisy areas',seg2_p:'Operators, mechanics, musicians and employees in sustained occupational noise environments.',
    seg2_li1:'Verifiable daily exposure record.',seg2_li2:'Alerts when you exceed the 85 dB limit.',seg2_li3:'Exportable history for medical-work use.',seg2_li4:'Compliance with SUNAFIL / Law 29783 regulations.',
    seg2_note:'ℹ️ SUNAFIL is the Peruvian agency that oversees workplace safety; Law No. 29783 sets the legal limits for noise exposure at work.',
    seg2_btn:'View worker dashboard',
    seg3_h:'Health professionals',seg3_p:'ENT doctors, neurologists and occupational health staff at clinics.',
    seg3_li1:'Exposure history of their patients.',seg3_li2:'Exportable reports for clinical diagnosis.',seg3_li3:'Analysis of critical zones by geographic area.',seg3_li4:'Longitudinal auditory follow-up panel.',
    seg3_btn:'View professional dashboard',seg_featured:'Most complete',
    glance_msg:'left in this zone before your mandatory hearing break',
    glance_sub:'Current level: 92 dB · Critical zone (SUNAFIL limit: 85 dB)',
    glance_show:'📊 View detailed panel',glance_hide:'✕ Hide detailed panel',
    feature_eyebrow:'Features',feature_h2:'Everything you need to protect your hearing',
    feat1_h:'Real-time measurement',feat1_p:'Precise noise levels using your device microphone, no additional hardware required.',
    feat2_h:'Collaborative maps',feat2_p:'Visualize noise zones in Lima generated by the user community.',
    feat3_h:'Smart alerts',feat3_p:'Personalized notifications when sound levels exceed your configured thresholds.',
    feat4_h:'Visual dashboard',feat4_p:'Dashboard adapted to your segment with metrics, charts and exposure status.',
    feat5_h:'Exportable history',feat5_p:'Downloadable exposure records in PDF for doctors, employers or authorities.',
    feat6_h:'Exposure dose',feat6_p:'Calculates your daily noise dose and warns you when to pause or use hearing protection.',
    feat7_h:'Advanced analysis',feat7_p:'Spectrograms, equivalent noise level (Leq) and professional metrics for experts.',
    feat8_h:'Institutional management',feat8_p:'Agreements with municipalities and health centers for analysis of critical zones.',
    feat9_h:'Multi-platform access',feat9_p:'Available on web, iOS and Android. Automatic sync across devices.',
    how_eyebrow:'How does it work?',how_h2:'In 4 simple steps',
    step1_h:'Create your account',step1_p:'Register and select your profile: citizen, worker or professional.',
    step2_h:'Activate the microphone',step2_p:'AudioSafe uses your smartphone microphone to capture the sound environment.',
    step3_h:'Monitor live',step3_p:'See noise levels in real time and receive alerts when you exceed limits.',
    step4_h:'Generate reports',step4_p:'Export your history in PDF for medical, work or personal use.',
    plans_eyebrow:'Plans',plans_h2:'Choose the plan for your needs',
    plan1_h:'Free',plan1_p:'To start measuring and understanding your exposure.',
    plan1_li1:'Basic real-time measurement.',plan1_li2:'Simple threshold alerts.',plan1_li3:'Access to collaborative map.',plan1_li4:'History for the last 7 days.',
    plan1_btn:'Start free',
    plan2_h:'Premium',plan2_p:'For citizens and workers who need more control.',plan2_price:'S/ 12.90',plan2_period:'/ month',
    plan2_li1:'Unlimited and exportable history.',plan2_li2:'Advanced custom alerts.',plan2_li3:'Daily / weekly dose analysis.',plan2_li4:'PDF reports for doctor or employer.',plan2_li5:'Priority support.',
    plan2_btn:'Sign in',popular_tag:'Most popular',
    plan3_h:'Institutional',plan3_p:'For clinics, companies and municipalities.',plan3_price:'Custom',
    plan3_li1:'Multi-user and multi-site panel.',plan3_li2:'Analytical reports by geographic area.',plan3_li3:'Integration with occupational health systems.',plan3_li4:'Agreement with SUNAFIL / municipalities.',plan3_li5:'Dedicated support.',
    plan3_btn:'Request information',
    faq_eyebrow:'Frequently asked questions',faq_h2:'Resolve your doubts before starting',
    faq1_q:'Do I need a special device to measure noise?',faq1_a:'No. AudioSafe uses your smartphone built-in microphone to measure sound levels. No additional hardware required.',
    faq2_q:'How accurate are the measurements?',faq2_a:'Measurements have an accuracy of +-2 to 3 dB compared to professional sound level meters. For clinical or legal contexts, we recommend supplementing with certified equipment.',
    faq3_q:'Does AudioSafe help comply with SUNAFIL regulations?',faq3_a:'Yes. Exportable daily exposure records and verifiable history support demonstrating occupational risk monitoring during inspections.',
    faq4_q:'Is my location and health data private?',faq4_a:'Yes. Your personal and location data is never shared with third parties without your explicit consent. Collaborative map data is shared anonymously and aggregated.',
    faq5_q:'Can I use AudioSafe as a health professional for my patients?',faq5_a:'Yes. The professional segment includes a patient panel with exposure history, exportable reports and longitudinal analysis designed for clinical use.',
    faq6_q:'Does it work in areas without internet?',faq6_a:'AudioSafe can capture data offline and sync it when you regain connection. The collaborative map requires connection to update data from other users.',
    contact_eyebrow:'Contact',contact_heading:'Do you have a question?',contact_p:'We are here to help you. Write to us and we will respond in less than 24 hours.',
    contact_talk_h:'Let us talk',contact_talk_p:'Our team is ready to guide you on the platform, institutional plans or custom integrations.',
    contact_hours:'Mon-Fri: 9:00am - 6:00pm',
    contact_inst_h:'🏥 Are you an institution?',contact_inst_p:'Contact us to learn about our agreements with municipalities, clinics and industrial companies in Lima.',
    contact_f_name:'First name',contact_f_lastname:'Last name',contact_f_email:'Email address',contact_f_subject:'Subject',contact_f_msg:'Message',contact_f_send:'Send message',
    contact_ph_name:'Your name',contact_ph_lastname:'Your last name',contact_ph_email:'you@email.com',contact_ph_msg:'Write your message here...',
    contact_opt1:'General inquiry',contact_opt2:'Institutional plan',contact_opt3:'Technical support',contact_opt4:'Municipal agreement',
    cta_h2:'Start protecting your hearing today',cta_p:'Join the most comprehensive sound monitoring platform in Lima. Measure, alert and act before the damage becomes permanent.',cta_btn:'Sign in',
    footer_product:'Product',footer_company:'Company',footer_legal:'Legal',
    footer_copy:'© 2026 AudioSafe – UPC IHC & Mobile Technologies Startup. All rights reserved.',
    modal_welcome:'Welcome to AudioSafe',modal_sub:'Sign in to access the dashboard.',
    modal_name:'First name',modal_lastname:'Last name',modal_email:'Email address',modal_pass:'Password',
    modal_ph_name:'Your name',modal_ph_lastname:'Your last name',modal_ph_email:'you@email.com',
    modal_profile_q:'What is your profile?',
    chip_ciudadano:'🏙️ Citizen',chip_trabajador:'⚙️ Worker',chip_profesional:'🩺 Professional',
    modal_btn_login:'Sign in',
    dash_panel:'📊 Dashboard',dash_mapa:'🗺️ Map',dash_historial:'📁 History',dash_alertas:'🔔 Alerts',dash_configurar:'⚙️ Settings',dash_perfil:'👤 My Profile',dash_exit:'← Exit',
    dash_greeting:'Control panel',
    btn_stop:'⏹ Stop monitoring',btn_start:'▶️ Start monitoring',btn_report:'📊 Export CSV',btn_export_pdf:'📄 Export report (PDF)',btn_share:'📍 Share location',
    mic_error:'We couldn\u2019t access your microphone. Enable permissions in your browser settings.',mic_retry:'🔄 Retry',
    kpi_c1:'Current level',kpi_c2:'Exposure today',kpi_c3:'Active alerts',kpi_c4:'Weekly dose',
    kpi_c1_trend:'↑ Above limit',kpi_c2_sub:'Of 8h maximum',kpi_c3_trend:'↑ 1 new today',kpi_c4_trend:'↓ Under control',
    chart_today:'History — last 12h',tag_today:'TODAY',
    panel_recent_alerts:'Recent alerts',
    alert1_p:'Critical level detected',alert1_s:'95 dB · Av. Javier Prado · 2h ago',
    alert2_p:'Moderately noisy zone',alert2_s:'72 dB · Miraflores · 4h ago',
    alert3_p:'Safe level',alert3_s:'48 dB · Parque Kennedy · 6h ago',
    panel_map:'Zone map — Lima',map_legend1:'Safe <65dB',map_legend2:'Moderate 65-85dB',map_legend3:'Critical >85dB',map_last_update:'Last update: 2 min ago',
    panel_recs:'Recommendations',
    rec1_p:'Use earplugs',rec1_s:'If you will be in a high-noise zone for more than 1h.',
    rec2_p:'Take a hearing rest',rec2_s:'Avoid headphones for the next 2 hours.',
    rec3_p:'Alternative route available',rec3_s:'Av. Arequipa: average level 58 dB.',
    kpi_w1:'Current exposure',kpi_w2:'Daily dose',kpi_w3:'Time in critical zone',kpi_w4:'Risk-free days',
    kpi_w1_trend:'↑ Exceeds limit (85 dB)',kpi_w2_trend:'↑ High risk',kpi_w3_trend:'↑ Of 8h maximum',kpi_w4_trend:'↓ This week',
    chart_week:'Exposure record — Week',days_short:'Mon,Tue,Wed,Thu,Fri,Sat,Sun',
    warn_box:'⚠️ Wednesday and Thursday exceeded the limit. Hearing rest is recommended on the weekend.',
    panel_dose:'Accumulated dose',dose_label:'Daily accumulated dose',
    panel_sunafil:'SUNAFIL History',tag_verif:'VERIFIABLE',
    th_date:'Date',th_max:'Max level',th_dose:'Dose',th_time:'Time',th_status:'Status',th_avg:'Avg level',th_exptime:'Exposure time',
    btn_export_csv:'📊 Export CSV',
    kpi_p1:'Active patients',kpi_p2:'At hearing risk',kpi_p3:'Reports generated',kpi_p4:'Average zone level',
    kpi_p1_trend:'↑ 3 new this week',kpi_p2_trend:'↑ Require attention',kpi_p3_sub:'This month',kpi_p4_trend:'↑ North industrial zone',
    panel_patients:'Patient panel',tag_clinical:'CLINICAL',
    th_patient:'Patient',th_sector:'Sector',th_exposure:'Exposure',th_risk:'Risk',
    panel_risk_dist:'Risk distribution',
    riskdist_critical:'Critical (>90 dB)',riskdist_high:'High (85–90 dB)',riskdist_moderate:'Moderate (65–85 dB)',riskdist_safe:'Safe (<65 dB)',
    label_patient:'patient',label_patients:'patients',
    btn_gen_report:'📊 Generate institutional report (CSV)',
    panel_hist_compare:'📈 Historical level comparison',tag_6months:'6 MONTHS',
    legend_normal:'Normal <65 dB',legend_moderate_risk:'Moderate Risk 65–85 dB',legend_high_risk:'High Risk >85 dB',
    months_short:'Jan,Feb,Mar,Apr,May,Jun',
    chart_peak_prefix:'⚠️ Peak:',
    hist_compare_caption:'Comparison of average level (left) vs. maximum level (right) reported by patients each month. Hover over each bar to see detail and risk level.',
    tt_avg:'average',tt_max:'max',
    tt_risk_normal:'Normal',tt_risk_moderate:'Moderate Risk',tt_risk_high:'High Risk',
    panel_prevent:'🩺 Preventive recommendations',
    prevent1_p:'Mandatory hearing protection',prevent1_s:'Recommend certified plugs or headphones for exposures >85 dB.',
    prevent2_p:'Scheduled hearing breaks',prevent2_s:'Suggest 15-min breaks every 2h in noisy environments.',
    prevent3_p:'Periodic audiometry',prevent3_s:'Annual check-up for patients with recurring dose >80%.',
    prevent4_p:'Referral to ENT specialist',prevent4_s:'Patients at Critical risk should be evaluated within 7 days.',
    toast_updating_map:'🔄 Updating map points...',
    map_panel_title:'🗺️ Noise map — Metropolitan Lima',tag_live:'LIVE',
    btn_refresh:'🔄 Refresh',btn_add_point:'📍 Add my point',btn_export_map:'📥 Export map',
    add_point_hint:'📍 Click on the map to place your noise point',map_last_update:'Last update: 2 min ago',
    hist_title:'📁 Complete exposure history',tag_30days:'30 DAYS',
    btn_filter_date:'📅 Filter by date',btn_clear_filter:'✕ Clear filter',
    kpi_a1:'Alerts today',kpi_a2:'This week',kpi_a3:'Critical zones',kpi_a4:'Max level today',
    kpi_a1_trend:'↑ 2 critical',kpi_a2_trend:'↑ 4 resolved',kpi_a3_trend:'↑ North Lima',kpi_a4_trend:'↑ Javier Prado',
    alerts_center_title:'🔔 Alert center',tag_active:'ACTIVE',
    btn_mark_read:'✓ Mark all as read',btn_config_alerts:'⚙️ Configure alerts',
    falert1_p:'🚨 CRITICAL — Level 96 dB detected',falert1_s:'Av. Javier Prado Este · 15 min ago · Your current location',
    falert2_p:'⚠️ Daily dose exceeded 85%',falert2_s:'Custom threshold reached · 1h ago',
    falert3_p:'Moderate zone — Av. La Marina',falert3_s:'74 dB · 3h ago · On the way to work',
    falert4_p:'✅ Safe level detected — Parque Kennedy',falert4_s:'48 dB · 6h ago',
    btn_resolve:'Resolve',btn_postpone:'Postpone',
    config_alerts_title:'🔔 Configure alerts',
    cfg_threshold_h:'Alert threshold',cfg_threshold_s:'Sound level to notify',
    cfg_push_h:'Push alerts',cfg_push_s:'Browser notifications',
    cfg_email_h:'Email alerts',cfg_email_s:'Daily email summary',
    cfg_night_h:'Night silence mode',cfg_night_s:'No alerts between 10pm-7am',
    zones_title:'📍 Monitoring zones',
    zone_active:'Active',zone_moderate:'Moderate',zone_critical:'Critical',
    status_high_risk:'High risk',status_exceeds_limit:'Exceeds limit',status_moderate:'Moderate',status_safe:'Safe',status_critical:'Critical',status_high:'High',
    zone_ciu1_n:'📍 Home',zone_ciu1_s:'Miraflores, Lima · 58 dB',
    zone_ciu2_n:'💼 Work',zone_ciu2_s:'San Isidro, Lima · 78 dB',
    zone_ciu3_n:'🏋️ Gym',zone_ciu3_s:'Surco, Lima · 91 dB',
    zone_trab1_n:'🏭 Production plant',zone_trab1_s:'Industrial zone, Ate · 92 dB',
    zone_trab2_n:'🔧 Maintenance workshop',zone_trab2_s:'Callao · 84 dB',
    zone_trab3_n:'🧰 Administrative office',zone_trab3_s:'Callao · 58 dB',
    zone_prof1_n:'🏥 ENT office',zone_prof1_s:'Clínica San Felipe, Jesús María · 52 dB',
    zone_prof2_n:'🩺 Waiting room',zone_prof2_s:'Clínica San Felipe · 68 dB',
    zone_prof3_n:'🏭 Industrial plant visit',zone_prof3_s:'North industrial zone · 89 dB',
    btn_add_zone:'+ Add zone',
    prefs_title:'🎛️ App preferences',pref_theme:'Theme',pref_lang:'Language',pref_unit:'Measurement unit',
    btn_change_theme:'Change theme',btn_save_prefs:'💾 Save preferences',
    prof_activity_title:'📊 Your activity summary',prof_sessions:'Monitoring sessions',prof_alerts_recv:'Alerts received',prof_reports:'Reports generated',
    label_name:'First name',label_lastname:'Last name',label_email:'Email',label_phone:'Phone',label_city:'City',label_segment:'Segment',
    btn_save_profile:'💾 Save changes',btn_change_pass:'🔑 Change password',
  },
  zh:{
    nav_inicio:'首页',nav_problema:'问题',nav_beneficios:'优势',nav_funcionalidades:'功能',nav_planes:'计划',nav_faq:'常见问题',nav_contacto:'联系',nav_login:'登录',
    hero_eyebrow:'🔊 智能听力保护',hero_h1_l1:'耳朵不会提前警告你,',hero_h1_l2:'但噪音正在悄悄伤害它。',hero_h1_l3:'AudioSafe 会。',
    dbx_c_lead:'什么是分贝（dB）？',dbx_c_body:'分贝（dB）用来衡量声音的响度。超过 65 dB，耳朵就开始感到压力；长时间处于 85 dB 以上，噪音可能损害您的听力。',
    dbx_w_lead:'什么是分贝（dB）？',dbx_w_body:'分贝（dB）用来衡量声音强度。SUNAFIL（秘鲁劳动监察局）规定，8 小时工作日内 85 dB 为安全职业暴露上限。',
    dbx_p_lead:'什么是分贝（dB）？',dbx_p_body:'分贝（dB）以对数刻度衡量声音强度：每增加 10 dB，响度大约感知为原来的两倍。世卫组织建议城市地区不超过 53 dB。',
    hero_p:'AudioSafe实时测量声级，生成协作地图，发送个性化警报，帮助您在利马的城市和工作环境中保护听力健康。',
    hero_btn_start:'立即开始',hero_btn_how:'如何使用',
    hero_stat1_label:'职业风险阈值',hero_stat2_label:'实时监测',hero_stat3_label:'服务细分群体',
    label_current_level:'当前声级',label_live:'直播',
    metric_exposure:'暴露',metric_zone:'区域',metric_risk:'风险',zone_moderate:'中等',risk_medium:'中等',
    float_alert_title:'⚠️ 预防警报',float_alert_body:'级别超过75分贝，请考虑使用听力保护装置。',
    problem_eyebrow:'问题',problem_h2:'噪音影响数百万人却未被察觉',
    problem_p:'利马主要大道记录到75-85 dB的噪声水平，远超53 dB推荐限值。听力损伤是无声且累积的。',
    prob_c1_h:'隐形损伤',prob_c1_p:'噪声性听力损失起初不痛，发现较晚，损伤已不可逆。',
    prob_c2_h:'嘈杂的城市',prob_c2_p:'超过60%的秘鲁城市人口生活在交通繁忙、噪声危险的区域。',
    prob_c3_h:'职业风险',prob_c3_p:'全球每3名工人中就有1人在工作期间暴露于超过85分贝的噪声中。',
    prob_c4_h:'诊断滞后',prob_c4_p:'医生缺乏患者的历史暴露客观数据来评估实际风险。',
    prob_c5_h:'缺乏可用工具',prob_c5_p:'现有解决方案要么过于专业，要么缺乏个性化警报和协作地图。',
    prob_c6_h:'问题持续增长',prob_c6_p:'到2050年，超过25亿人将出现不同程度的听力损失（世卫组织，2021年）。',
    benefit_eyebrow:'优势',benefit_h2:'为每位用户量身定制的体验',
    benefit_p:'AudioSafe为需要管理声音暴露的市民、工人和健康专业人士提供价值。',
    seg1_h:'城市市民',seg1_p:'长期暴露于城市噪声的18-60岁人群。',
    seg1_li1:'通过智能手机实时测量。',seg1_li2:'超过风险阈值时发出警报。',seg1_li3:'日常路线噪声区地图。',seg1_li4:'保护听力的建议。',
    seg1_btn:'查看市民仪表板',
    seg2_h:'噪声区工人',seg2_p:'操作员、机械师、音乐家和持续噪声工作环境中的员工。',
    seg2_li1:'可核查的每日暴露记录。',seg2_li2:'超过85分贝限值时发出警报。',seg2_li3:'可导出的医疗/工作历史记录。',seg2_li4:'符合SUNAFIL/第29783号法律规定。',
    seg2_note:'ℹ️ SUNAFIL是秘鲁负责监督劳动安全的机构；第29783号法律规定了工作场所噪音暴露的法定限值。',
    seg2_btn:'查看工人仪表板',
    seg3_h:'健康专业人员',seg3_p:'诊所的耳鼻喉科医生、神经科医生和职业健康人员。',
    seg3_li1:'患者的暴露历史。',seg3_li2:'可导出的临床诊断报告。',seg3_li3:'按地理区域分析关键区域。',seg3_li4:'纵向听力随访面板。',
    seg3_btn:'查看专业人员仪表板',seg_featured:'最全面',
    glance_msg:'后需要在此区域进行强制听力休息',
    glance_sub:'当前水平：92 dB · 危急区域（SUNAFIL 限值：85 dB）',
    glance_show:'📊 查看详细面板',glance_hide:'✕ 隐藏详细面板',
    feature_eyebrow:'功能',feature_h2:'保护听力所需的一切',
    feat1_h:'实时测量',feat1_p:'使用设备麦克风精确测量噪声级，无需额外硬件。',
    feat2_h:'协作地图',feat2_p:'可视化利马用户社区生成的噪声区。',
    feat3_h:'智能警报',feat3_p:'声级超过您配置的阈值时发送个性化通知。',
    feat4_h:'可视化面板',feat4_p:'根据您的细分市场定制的仪表板，包含指标、图表和暴露状态。',
    feat5_h:'可导出历史记录',feat5_p:'可下载PDF格式的暴露记录，供医生、雇主或当局使用。',
    feat6_h:'暴露剂量',feat6_p:'计算您的每日噪声剂量，并在需要暂停或使用听力保护时提醒您。',
    feat7_h:'高级分析',feat7_p:'专家的频谱图、等效噪声级（Leq）和专业指标。',
    feat8_h:'机构管理',feat8_p:'与市政府和卫生中心签订协议，分析关键区域。',
    feat9_h:'多平台访问',feat9_p:'可在网页、iOS和Android上使用。设备间自动同步。',
    how_eyebrow:'如何使用？',how_h2:'4个简单步骤',
    step1_h:'创建账户',step1_p:'注册并选择您的档案：市民、工人或专业人员。',
    step2_h:'激活麦克风',step2_p:'AudioSafe使用您的智能手机麦克风捕捉声音环境。',
    step3_h:'实时监测',step3_p:'实时查看噪声级，当超过限值时接收警报。',
    step4_h:'生成报告',step4_p:'以PDF格式导出历史记录，供医疗、工作或个人使用。',
    plans_eyebrow:'计划',plans_h2:'选择适合您需求的计划',
    plan1_h:'免费',plan1_p:'开始测量和了解您的暴露情况。',
    plan1_li1:'基本实时测量。',plan1_li2:'简单阈值警报。',plan1_li3:'访问协作地图。',plan1_li4:'最近7天的历史记录。',
    plan1_btn:'免费开始',
    plan2_h:'高级版',plan2_p:'适合需要更多控制的市民和工人。',plan2_price:'S/ 12.90',plan2_period:'/ 月',
    plan2_li1:'无限可导出历史记录。',plan2_li2:'高级自定义警报。',plan2_li3:'每日/每周剂量分析。',plan2_li4:'供医生或雇主使用的PDF报告。',plan2_li5:'优先支持。',
    plan2_btn:'登录',popular_tag:'最受欢迎',
    plan3_h:'机构版',plan3_p:'适用于诊所、企业和市政府。',plan3_price:'定制',
    plan3_li1:'多用户多站点面板。',plan3_li2:'按地理区域分析报告。',plan3_li3:'与职业卫生系统集成。',plan3_li4:'与SUNAFIL/市政府签订协议。',plan3_li5:'专属支持。',
    plan3_btn:'申请信息',
    faq_eyebrow:'常见问题',faq_h2:'开始前解答您的疑问',
    faq1_q:'我需要特殊设备来测量噪音吗？',faq1_a:'不需要。AudioSafe使用智能手机内置麦克风测量声级，无需额外硬件。',
    faq2_q:'测量精度如何？',faq2_a:'与专业声级计相比，测量精度为±2-3 dB。对于临床或法律场景，建议补充使用认证设备。',
    faq3_q:'AudioSafe有助于遵守SUNAFIL法规吗？',faq3_a:'是的。可导出的每日暴露记录和可核查的历史记录有助于在检查时证明职业风险监测。',
    faq4_q:'我的位置和健康数据是否私密？',faq4_a:'是的。未经您明确同意，您的个人和位置数据永远不会与第三方共享。协作地图数据以匿名汇总方式共享。',
    faq5_q:'我可以作为健康专业人员为患者使用AudioSafe吗？',faq5_a:'是的。专业版细分市场包括一个患者面板，具有暴露历史记录、可导出报告和为临床使用设计的纵向分析。',
    faq6_q:'在没有网络的区域能使用吗？',faq6_a:'AudioSafe可以离线捕获数据，并在恢复连接时同步。协作地图需要连接才能更新其他用户的数据。',
    contact_eyebrow:'联系',contact_heading:'您有任何疑问吗？',contact_p:'我们在这里帮助您。请写信给我们，我们将在24小时内回复。',
    contact_talk_h:'联系我们',contact_talk_p:'我们的团队随时准备为您提供平台、机构计划或定制集成方面的指导。',
    contact_hours:'周一至周五：上午9:00 – 下午6:00',
    contact_inst_h:'🏥 您是机构吗？',contact_inst_p:'请联系我们，了解我们与利马市政府、诊所和工业企业的合作协议。',
    contact_f_name:'名字',contact_f_lastname:'姓氏',contact_f_email:'电子邮件地址',contact_f_subject:'主题',contact_f_msg:'消息',contact_f_send:'发送消息',
    contact_ph_name:'您的名字',contact_ph_lastname:'您的姓氏',contact_ph_email:'您的邮箱',contact_ph_msg:'在此输入您的消息...',
    contact_opt1:'一般咨询',contact_opt2:'机构计划',contact_opt3:'技术支持',contact_opt4:'市政协议',
    cta_h2:'今天开始保护您的听力',cta_p:'加入利马最全面的声音监测平台。在损伤变得永久之前测量、警报和行动。',cta_btn:'登录',
    footer_product:'产品',footer_company:'公司',footer_legal:'法律',
    footer_copy:'© 2026 AudioSafe – UPC IHC & 移动技术创业公司。版权所有。',
    modal_welcome:'欢迎使用AudioSafe',modal_sub:'登录以访问仪表板。',
    modal_name:'名字',modal_lastname:'姓氏',modal_email:'电子邮件地址',modal_pass:'密码',
    modal_ph_name:'您的名字',modal_ph_lastname:'您的姓氏',modal_ph_email:'您的邮箱',
    modal_profile_q:'您的档案是什么？',
    chip_ciudadano:'🏙️ 市民',chip_trabajador:'⚙️ 工人',chip_profesional:'🩺 专业人员',
    modal_btn_login:'登录',
    dash_panel:'📊 面板',dash_mapa:'🗺️ 地图',dash_historial:'📁 历史',dash_alertas:'🔔 警报',dash_configurar:'⚙️ 设置',dash_perfil:'👤 我的档案',dash_exit:'← 退出',
    dash_greeting:'控制面板',
    btn_stop:'⏹ 停止监测',btn_start:'▶️ 开始监测',btn_report:'📊 导出CSV',btn_export_pdf:'📄 导出报告（PDF）',btn_share:'📍 分享位置',
    mic_error:'我们无法访问您的麦克风。请在浏览器设置中启用权限。',mic_retry:'🔄 重试',
    kpi_c1:'当前级别',kpi_c2:'今日暴露',kpi_c3:'活跃警报',kpi_c4:'每周剂量',
    kpi_c1_trend:'↑ 超过限值',kpi_c2_sub:'最多8小时',kpi_c3_trend:'↑ 今天1个新警报',kpi_c4_trend:'↓ 受控',
    chart_today:'历史记录 — 最近12小时',tag_today:'今天',
    panel_recent_alerts:'最近警报',
    alert1_p:'检测到危急级别',alert1_s:'95 dB · Av. Javier Prado · 2小时前',
    alert2_p:'中度嘈杂区域',alert2_s:'72 dB · Miraflores · 4小时前',
    alert3_p:'安全级别',alert3_s:'48 dB · Parque Kennedy · 6小时前',
    panel_map:'区域地图 — 利马',map_legend1:'安全 <65dB',map_legend2:'中等 65-85dB',map_legend3:'危急 >85dB',map_last_update:'最后更新：2 分钟前',
    panel_recs:'建议',
    rec1_p:'使用耳塞',rec1_s:'如果您将在高噪声区待超过1小时。',
    rec2_p:'休息耳朵',rec2_s:'接下来2小时内避免使用耳机。',
    rec3_p:'可选替代路线',rec3_s:'Av. Arequipa：平均水平58 dB。',
    kpi_w1:'当前暴露',kpi_w2:'每日剂量',kpi_w3:'在危急区时间',kpi_w4:'无风险天数',
    kpi_w1_trend:'↑ 超过限值（85 dB）',kpi_w2_trend:'↑ 高风险',kpi_w3_trend:'↑ 最多8小时',kpi_w4_trend:'↓ 本周',
    chart_week:'暴露记录 — 本周',days_short:'周一,周二,周三,周四,周五,周六,周日',
    warn_box:'⚠️ 周三和周四超过了限值，建议周末休息耳朵。',
    panel_dose:'累计剂量',dose_label:'每日累计剂量',
    panel_sunafil:'SUNAFIL历史记录',tag_verif:'可核查',
    th_date:'日期',th_max:'最高级别',th_dose:'剂量',th_time:'时间',th_status:'状态',th_avg:'平均级别',th_exptime:'暴露时间',
    btn_export_csv:'📊 导出CSV',
    kpi_p1:'活跃患者',kpi_p2:'听力风险',kpi_p3:'生成报告',kpi_p4:'区域平均水平',
    kpi_p1_trend:'↑ 本周3名新患者',kpi_p2_trend:'↑ 需要关注',kpi_p3_sub:'本月',kpi_p4_trend:'↑ 北部工业区',
    panel_patients:'患者面板',tag_clinical:'临床',
    th_patient:'患者',th_sector:'行业',th_exposure:'暴露',th_risk:'风险',
    panel_risk_dist:'风险分布',
    riskdist_critical:'危急 (>90 dB)',riskdist_high:'较高 (85–90 dB)',riskdist_moderate:'中等 (65–85 dB)',riskdist_safe:'安全 (<65 dB)',
    label_patient:'位患者',label_patients:'位患者',
    btn_gen_report:'📊 生成机构报告 (CSV)',
    panel_hist_compare:'📈 历史水平对比',tag_6months:'6个月',
    legend_normal:'正常 <65 dB',legend_moderate_risk:'中等风险 65–85 dB',legend_high_risk:'高风险 >85 dB',
    months_short:'1月,2月,3月,4月,5月,6月',
    chart_peak_prefix:'⚠️ 峰值：',
    hist_compare_caption:'每月患者报告的平均水平（左）与最高水平（右）对比。将鼠标悬停在每个柱形上可查看详情和风险等级。',
    tt_avg:'平均',tt_max:'最高',
    tt_risk_normal:'正常',tt_risk_moderate:'中等风险',tt_risk_high:'高风险',
    panel_prevent:'🩺 预防建议',
    prevent1_p:'强制听力防护',prevent1_s:'建议对暴露 >85 dB 的情况使用认证耳塞或耳罩。',
    prevent2_p:'定期听力休息',prevent2_s:'在噪声环境中每2小时建议休息15分钟。',
    prevent3_p:'定期听力检测',prevent3_s:'对反复剂量 >80% 的患者进行年度检查。',
    prevent4_p:'转诊耳鼻喉科专家',prevent4_s:'处于危急风险的患者应在7天内接受评估。',
    toast_updating_map:'🔄 正在更新地图点位...',
    map_panel_title:'🗺️ 噪声地图 — 利马大都市',tag_live:'直播',
    btn_refresh:'🔄 刷新',btn_add_point:'📍 添加我的点',btn_export_map:'📥 导出地图',
    add_point_hint:'📍 点击地图放置您的噪声点',map_last_update:'上次更新：2分钟前',
    hist_title:'📁 完整暴露历史记录',tag_30days:'30天',
    btn_filter_date:'📅 按日期筛选',btn_clear_filter:'✕ 清除筛选',
    kpi_a1:'今日警报',kpi_a2:'本周',kpi_a3:'危急区域',kpi_a4:'今日最高级别',
    kpi_a1_trend:'↑ 2个危急',kpi_a2_trend:'↑ 4个已解决',kpi_a3_trend:'↑ 利马北部',kpi_a4_trend:'↑ Javier Prado',
    alerts_center_title:'🔔 警报中心',tag_active:'活跃',
    btn_mark_read:'✓ 全部标为已读',btn_config_alerts:'⚙️ 配置警报',
    falert1_p:'🚨 危急 — 检测到96 dB',falert1_s:'Av. Javier Prado Este · 15分钟前 · 您当前位置',
    falert2_p:'⚠️ 每日剂量超过85%',falert2_s:'已达到自定义阈值 · 1小时前',
    falert3_p:'中等区域 — Av. La Marina',falert3_s:'74 dB · 3小时前 · 上班途中',
    falert4_p:'✅ 检测到安全级别 — Parque Kennedy',falert4_s:'48 dB · 6小时前',
    btn_resolve:'解决',btn_postpone:'推迟',
    config_alerts_title:'🔔 配置警报',
    cfg_threshold_h:'警报阈值',cfg_threshold_s:'通知的声级',
    cfg_push_h:'推送警报',cfg_push_s:'浏览器通知',
    cfg_email_h:'电子邮件警报',cfg_email_s:'每日邮件摘要',
    cfg_night_h:'夜间静音模式',cfg_night_s:'晚上10点至早上7点无警报',
    zones_title:'📍 监测区域',
    zone_active:'活跃',zone_moderate:'中等',zone_critical:'危急',
    status_high_risk:'高风险',status_exceeds_limit:'超出限值',status_moderate:'中等',status_safe:'安全',status_critical:'危急',status_high:'较高',
    zone_ciu1_n:'📍 家',zone_ciu1_s:'Miraflores, 利马 · 58 dB',
    zone_ciu2_n:'💼 工作',zone_ciu2_s:'San Isidro, 利马 · 78 dB',
    zone_ciu3_n:'🏋️ 健身房',zone_ciu3_s:'Surco, 利马 · 91 dB',
    zone_trab1_n:'🏭 生产工厂',zone_trab1_s:'工业区，Ate · 92 dB',
    zone_trab2_n:'🔧 维修车间',zone_trab2_s:'Callao · 84 dB',
    zone_trab3_n:'🧰 行政办公室',zone_trab3_s:'Callao · 58 dB',
    zone_prof1_n:'🏥 耳鼻喉科诊室',zone_prof1_s:'圣费利佩诊所，Jesús María · 52 dB',
    zone_prof2_n:'🩺 候诊室',zone_prof2_s:'圣费利佩诊所 · 68 dB',
    zone_prof3_n:'🏭 工业厂区巡查',zone_prof3_s:'北部工业区 · 89 dB',
    btn_add_zone:'+ 添加区域',
    prefs_title:'🎛️ 应用偏好',pref_theme:'主题',pref_lang:'语言',pref_unit:'测量单位',
    btn_change_theme:'更换主题',btn_save_prefs:'💾 保存偏好',
    prof_activity_title:'📊 您的活动摘要',prof_sessions:'监测会话',prof_alerts_recv:'收到警报',prof_reports:'生成报告',
    label_name:'名字',label_lastname:'姓氏',label_email:'电子邮件',label_phone:'电话',label_city:'城市',label_segment:'细分',
    btn_save_profile:'💾 保存更改',btn_change_pass:'🔑 更改密码',
  }
};
let currentLang='es';

function setLang(lang,silent){
  currentLang=lang;
  const t=i18n[lang]||i18n.es;

  // NAV
  const navMap={inicio:'nav_inicio',problema:'nav_problema',beneficios:'nav_beneficios',funcionalidades:'nav_funcionalidades',planes:'nav_planes',faq:'nav_faq',contacto:'nav_contacto'};
  document.querySelectorAll('.nav-links a').forEach(a=>{const href=(a.getAttribute('href')||'').replace('#','');if(navMap[href])a.textContent=t[navMap[href]];});
  document.querySelectorAll('[data-i18n]').forEach(el=>{const k=el.getAttribute('data-i18n');if(t[k])el.textContent=t[k];});

  // HERO
  const heroPara=document.querySelector('.hero-content>p');if(heroPara)heroPara.textContent=t.hero_p;
  const heroStart=document.querySelector('.hero-actions .btn-primary');if(heroStart)heroStart.textContent=t.hero_btn_start;
  const heroHow=document.querySelector('.hero-actions .btn-secondary');if(heroHow)heroHow.textContent=t.hero_btn_how;
  const heroStats=document.querySelectorAll('.hero-stats div');
  if(heroStats[0])heroStats[0].querySelector('span').textContent=t.hero_stat1_label;
  if(heroStats[1])heroStats[1].querySelector('span').textContent=t.hero_stat2_label;
  if(heroStats[2])heroStats[2].querySelector('span').textContent=t.hero_stat3_label;

  // MONITOR CARD
  const monLabel=document.querySelector('.monitor-header .label');if(monLabel)monLabel.textContent=t.label_current_level;
  const liveBadge=document.querySelector('.live-badge');if(liveBadge)liveBadge.innerHTML='<span class="live-dot"></span> '+t.label_live;
  const mpills=document.querySelectorAll('.metric-pill');
  if(mpills[0])mpills[0].querySelector('.m-label').textContent=t.metric_exposure;
  if(mpills[1]){mpills[1].querySelector('.m-label').textContent=t.metric_zone;mpills[1].querySelector('.m-value').textContent=t.zone_moderate;}
  if(mpills[2]){mpills[2].querySelector('.m-label').textContent=t.metric_risk;mpills[2].querySelector('.m-value').textContent=t.risk_medium;}
  const floatAlert=document.querySelector('.float-alert');
  if(floatAlert){floatAlert.querySelector('strong').textContent=t.float_alert_title;floatAlert.querySelector('span').textContent=t.float_alert_body;}

  // SECTION EYEBROWS (only section-heading ones, not hero)
  const sectionEyebrows=document.querySelectorAll('.section-heading .eyebrow');
  const sEyeKeys=['problem_eyebrow','benefit_eyebrow','feature_eyebrow','how_eyebrow','plans_eyebrow','faq_eyebrow','contact_eyebrow'];
  sectionEyebrows.forEach((el,i)=>{if(sEyeKeys[i])el.textContent=t[sEyeKeys[i]];});
  // H2s
  const sH2s=document.querySelectorAll('.section-heading h2');
  const sH2Keys=['problem_h2','benefit_h2','feature_h2','how_h2','plans_h2','faq_h2','contact_heading'];
  sH2s.forEach((el,i)=>{if(sH2Keys[i])el.textContent=t[sH2Keys[i]];});
  // Paras
  const sPs=document.querySelectorAll('.section-heading>p');
  const sPKeys=['problem_p','benefit_p',null,null,null,null,'contact_p'];
  sPs.forEach((el,i)=>{if(sPKeys[i])el.textContent=t[sPKeys[i]];});

  // PROBLEMA CARDS
  const probCards=document.querySelectorAll('#problema .info-card');
  const probData=[['prob_c1_h','prob_c1_p'],['prob_c2_h','prob_c2_p'],['prob_c3_h','prob_c3_p'],['prob_c4_h','prob_c4_p'],['prob_c5_h','prob_c5_p'],['prob_c6_h','prob_c6_p']];
  probCards.forEach((card,i)=>{if(probData[i]){card.querySelector('h3').textContent=t[probData[i][0]];card.querySelector('p').textContent=t[probData[i][1]];}});

  // BENEFICIOS
  const segCards=document.querySelectorAll('.segment-card');
  const segData=[{h:'seg1_h',p:'seg1_p',li:['seg1_li1','seg1_li2','seg1_li3','seg1_li4'],btn:'seg1_btn'},{h:'seg2_h',p:'seg2_p',li:['seg2_li1','seg2_li2','seg2_li3','seg2_li4'],btn:'seg2_btn'},{h:'seg3_h',p:'seg3_p',li:['seg3_li1','seg3_li2','seg3_li3','seg3_li4'],btn:'seg3_btn'}];
  segCards.forEach((card,i)=>{
    if(!segData[i])return;const d=segData[i];
    card.querySelector('h3').textContent=t[d.h];
    card.querySelector(':scope>p').textContent=t[d.p];
    const lis=card.querySelectorAll('ul li');d.li.forEach((k,j)=>{if(lis[j])lis[j].textContent=t[k];});
    const btn=card.querySelector('.btn-segment');if(btn)btn.textContent=t[d.btn];
  });

  // FUNCIONALIDADES
  const featCards=document.querySelectorAll('.feature-card');
  const featData=[['feat1_h','feat1_p'],['feat2_h','feat2_p'],['feat3_h','feat3_p'],['feat4_h','feat4_p'],['feat5_h','feat5_p'],['feat6_h','feat6_p'],['feat7_h','feat7_p'],['feat8_h','feat8_p'],['feat9_h','feat9_p']];
  featCards.forEach((card,i)=>{if(featData[i]){card.querySelector('h3').textContent=t[featData[i][0]];card.querySelector('p').textContent=t[featData[i][1]];}});

  // PASOS
  const steps=document.querySelectorAll('.step-card');
  const stepData=[['step1_h','step1_p'],['step2_h','step2_p'],['step3_h','step3_p'],['step4_h','step4_p']];
  steps.forEach((s,i)=>{if(stepData[i]){s.querySelector('h3').textContent=t[stepData[i][0]];s.querySelector('p').textContent=t[stepData[i][1]];}});

  // PLANES
  const priceCards=document.querySelectorAll('.price-card');
  if(priceCards[0]){priceCards[0].querySelector('h3').textContent=t.plan1_h;priceCards[0].querySelector(':scope>p').textContent=t.plan1_p;const l=priceCards[0].querySelectorAll('ul li');['plan1_li1','plan1_li2','plan1_li3','plan1_li4'].forEach((k,j)=>{if(l[j])l[j].textContent=t[k];});const b=priceCards[0].querySelector('.btn-plan');if(b)b.textContent=t.plan1_btn;}
  if(priceCards[1]){priceCards[1].querySelector('h3').textContent=t.plan2_h;priceCards[1].querySelector(':scope>p').textContent=t.plan2_p;const pn=priceCards[1].querySelector('.price-num');if(pn)pn.innerHTML=t.plan2_price+' <small>'+t.plan2_period+'</small>';const l=priceCards[1].querySelectorAll('ul li');['plan2_li1','plan2_li2','plan2_li3','plan2_li4','plan2_li5'].forEach((k,j)=>{if(l[j])l[j].textContent=t[k];});const b=priceCards[1].querySelector('.btn-plan');if(b)b.textContent=t.plan2_btn;const pt=priceCards[1].querySelector('.popular-tag');if(pt)pt.textContent=t.popular_tag;}
  if(priceCards[2]){priceCards[2].querySelector('h3').textContent=t.plan3_h;priceCards[2].querySelector(':scope>p').textContent=t.plan3_p;const pn=priceCards[2].querySelector('.price-num');if(pn)pn.textContent=t.plan3_price;const l=priceCards[2].querySelectorAll('ul li');['plan3_li1','plan3_li2','plan3_li3','plan3_li4','plan3_li5'].forEach((k,j)=>{if(l[j])l[j].textContent=t[k];});const b=priceCards[2].querySelector('.btn-plan');if(b)b.textContent=t.plan3_btn;}

  // FAQ
  const faqs=document.querySelectorAll('.faq-list details');
  const faqData=[['faq1_q','faq1_a'],['faq2_q','faq2_a'],['faq3_q','faq3_a'],['faq4_q','faq4_a'],['faq5_q','faq5_a'],['faq6_q','faq6_a']];
  faqs.forEach((d,i)=>{if(faqData[i]){d.querySelector('summary').childNodes[0].textContent=t[faqData[i][0]];d.querySelector('p').textContent=t[faqData[i][1]];}});

  // CONTACTO
  const contactInfo=document.querySelector('.contact-info');
  if(contactInfo){
    const h3=contactInfo.querySelector('h3');if(h3)h3.textContent=t.contact_talk_h;
    const p=contactInfo.querySelector('p');if(p)p.textContent=t.contact_talk_p;
    const items=contactInfo.querySelectorAll('.contact-item');
    if(items[3]){const spans=items[3].querySelectorAll('span');if(spans[1])spans[1].textContent=t.contact_hours;}
    const innerDivs=contactInfo.querySelectorAll('div>p');
    innerDivs.forEach(p=>{if(p.style&&p.style.color==='var(--cyan)')p.textContent=t.contact_inst_h;});
    const muted=contactInfo.querySelectorAll('div p[style*="muted"],div>.muted');
    if(muted[0])muted[0].textContent=t.contact_inst_p;
  }
  const cForm=document.querySelector('.contact-form');
  if(cForm){
    const labels=cForm.querySelectorAll('label');
    ['contact_f_name','contact_f_lastname','contact_f_email','contact_f_subject','contact_f_msg'].forEach((k,i)=>{if(labels[i])labels[i].textContent=t[k];});
    const inputs=cForm.querySelectorAll('input[type=text],input[type=email]');
    if(inputs[0])inputs[0].placeholder=t.contact_ph_name;
    if(inputs[1])inputs[1].placeholder=t.contact_ph_lastname;
    if(inputs[2])inputs[2].placeholder=t.contact_ph_email;
    const ta=cForm.querySelector('textarea');if(ta)ta.placeholder=t.contact_ph_msg;
    const opts=cForm.querySelectorAll('select option');
    ['contact_opt1','contact_opt2','contact_opt3','contact_opt4'].forEach((k,j)=>{if(opts[j])opts[j].textContent=t[k];});
    const sendBtn=cForm.querySelector('button');if(sendBtn)sendBtn.textContent=t.contact_f_send;
  }

  // CTA
  const ctaCard=document.querySelector('.cta-card');
  if(ctaCard){const h2=ctaCard.querySelector('h2');if(h2)h2.textContent=t.cta_h2;const p=ctaCard.querySelector('p');if(p)p.textContent=t.cta_p;const btn=ctaCard.querySelector('button');if(btn)btn.textContent=t.cta_btn;}

  // FOOTER
  const footCopy=document.querySelector('.footer-bottom small');if(footCopy)footCopy.textContent=t.footer_copy;
  const footCols=document.querySelectorAll('.footer-col h4');
  if(footCols[1])footCols[1].textContent=t.footer_product;
  if(footCols[2])footCols[2].textContent=t.footer_company;
  if(footCols[3])footCols[3].textContent=t.footer_legal;

  // MODAL
  const modalTitle=document.querySelector('.modal-title');if(modalTitle)modalTitle.textContent=t.modal_welcome;
  const modalSub=document.querySelector('.modal-sub');if(modalSub)modalSub.textContent=t.modal_sub;
  const modalLabels=document.querySelectorAll('#loginOverlay .form-group label');
  ['modal_name','modal_lastname','modal_email','modal_pass'].forEach((k,i)=>{if(modalLabels[i])modalLabels[i].textContent=t[k];});
  const ln=document.getElementById('loginNombre');if(ln)ln.placeholder=t.modal_ph_name;
  const la=document.getElementById('loginApellido');if(la)la.placeholder=t.modal_ph_lastname;
  const le=document.getElementById('loginEmail');if(le)le.placeholder=t.modal_ph_email;
  const mSegQ=document.querySelector('.modal-seg-label');if(mSegQ)mSegQ.textContent=t.modal_profile_q;
  const chipC=document.getElementById('chip-ciudadano');if(chipC)chipC.textContent=t.chip_ciudadano;
  const chipW=document.getElementById('chip-trabajador');if(chipW)chipW.textContent=t.chip_trabajador;
  const chipP=document.getElementById('chip-profesional');if(chipP)chipP.textContent=t.chip_profesional;
  const btnLoginEl=document.querySelector('.btn-full.btn-login');if(btnLoginEl)btnLoginEl.textContent=t.modal_btn_login;

  // DASHBOARD NAV
  const dn=document.getElementById('dn-panel');if(dn)dn.textContent=t.dash_panel;
  const dnm=document.getElementById('dn-mapa');if(dnm)dnm.textContent=t.dash_mapa;
  const dnh=document.getElementById('dn-historial');if(dnh)dnh.textContent=t.dash_historial;
  const dna=document.getElementById('dn-alertas');if(dna)dna.innerHTML=t.dash_alertas+'<span class="notif-dot"></span>';
  const dnc=document.getElementById('dn-configurar');if(dnc)dnc.textContent=t.dash_configurar;
  const dnp=document.getElementById('dn-perfil');if(dnp)dnp.textContent=t.dash_perfil;
  const exitBtn=document.querySelector('.dash-nav .btn-ghost');if(exitBtn)exitBtn.textContent=t.dash_exit;

  // DASHBOARD WELCOME
  const dg=document.getElementById('dashGreet');if(dg)dg.textContent=t.dash_greeting;

  // MONITOR CONTROLS
  const btnStop=document.getElementById('btnStop');if(btnStop)btnStop.textContent=monitoring?t.btn_stop:t.btn_start;
  const ctrlBtns=document.querySelectorAll('.monitor-controls .ctrl-btn');
  if(ctrlBtns[1])ctrlBtns[1].textContent=t.btn_report;
  if(ctrlBtns[2])ctrlBtns[2].textContent=t.btn_export_pdf;
  if(ctrlBtns[3])ctrlBtns[3].textContent=t.btn_share;
  const micErr=document.getElementById('micErrorBanner');
  if(micErr){const mt=micErr.querySelector('.mic-error-text');if(mt)mt.textContent=t.mic_error;const rb=micErr.querySelector('.mic-retry-btn');if(rb)rb.textContent=t.mic_retry;}

  // KPI CIUDADANO
  const kpiC=document.querySelectorAll('#dash-ciudadano .kpi-card');
  [['kpi_c1','kpi_c1_trend'],['kpi_c2','kpi_c2_sub'],['kpi_c3','kpi_c3_trend'],['kpi_c4','kpi_c4_trend']].forEach(([lk,tk],i)=>{
    if(!kpiC[i])return;const l=kpiC[i].querySelector('.kpi-label');if(l)l.textContent=t[lk];const tr=kpiC[i].querySelector('.kpi-trend');if(tr)tr.textContent=t[tk];
  });
  const cPanels=document.querySelectorAll('#dash-ciudadano .dash-panel');
  if(cPanels[0]){const pt=cPanels[0].querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.chart_today+' ';if(tag)tag.textContent=t.tag_today;}}
  if(cPanels[1]){const pt=cPanels[1].querySelector('.panel-title');if(pt)pt.textContent=t.panel_recent_alerts;}
  const cAlerts=document.querySelectorAll('#dash-ciudadano .alert-list .alert-item');
  if(cAlerts[0]){const p=cAlerts[0].querySelector('.alert-body p');const s=cAlerts[0].querySelector('.alert-body small');if(p)p.textContent=t.alert1_p;if(s)s.textContent=t.alert1_s;}
  if(cAlerts[1]){const p=cAlerts[1].querySelector('.alert-body p');const s=cAlerts[1].querySelector('.alert-body small');if(p)p.textContent=t.alert2_p;if(s)s.textContent=t.alert2_s;}
  if(cAlerts[2]){const p=cAlerts[2].querySelector('.alert-body p');const s=cAlerts[2].querySelector('.alert-body small');if(p)p.textContent=t.alert3_p;if(s)s.textContent=t.alert3_s;}
  if(cPanels[2]){const pt=cPanels[2].querySelector('.panel-title');if(pt)pt.textContent=t.panel_recs;}
  if(cAlerts[3]){const ab=cAlerts[3].querySelector('.alert-body');if(ab){const p=ab.querySelector('p');const s=ab.querySelector('small');if(p)p.textContent=t.rec1_p;if(s)s.textContent=t.rec1_s;}}
  if(cAlerts[4]){const ab=cAlerts[4].querySelector('.alert-body');if(ab){const p=ab.querySelector('p');const s=ab.querySelector('small');if(p)p.textContent=t.rec2_p;if(s)s.textContent=t.rec2_s;}}
  if(cAlerts[5]){const ab=cAlerts[5].querySelector('.alert-body');if(ab){const p=ab.querySelector('p');const s=ab.querySelector('small');if(p)p.textContent=t.rec3_p;if(s)s.textContent=t.rec3_s;}}

  // GLANCE CARD TRABAJADOR
  const gMsg=document.getElementById('glanceMsg');if(gMsg)gMsg.textContent=t.glance_msg;
  const gSub=document.getElementById('glanceSub');if(gSub)gSub.textContent=t.glance_sub;
  const gBtn=document.getElementById('glanceToggleBtn');
  if(gBtn)gBtn.textContent=(document.getElementById('workerDetail')&&document.getElementById('workerDetail').style.display!=='none')?t.glance_hide:t.glance_show;

  // KPI TRABAJADOR
  const kpiW=document.querySelectorAll('#dash-trabajador .kpi-card');
  [['kpi_w1','kpi_w1_trend'],['kpi_w2','kpi_w2_trend'],['kpi_w3','kpi_w3_trend'],['kpi_w4','kpi_w4_trend']].forEach(([lk,tk],i)=>{
    if(!kpiW[i])return;const l=kpiW[i].querySelector('.kpi-label');if(l)l.textContent=t[lk];const tr=kpiW[i].querySelector('.kpi-trend');if(tr)tr.textContent=t[tk];
  });
  const wPanels=document.querySelectorAll('#dash-trabajador .dash-panel');
  if(wPanels[0]){const pt=wPanels[0].querySelector('.panel-title');if(pt)pt.textContent=t.chart_week;}
  const dayLabels=document.querySelectorAll('#dash-trabajador .chart-labels span');
  const days=(t.days_short||'').split(',');dayLabels.forEach((el,i)=>{if(days[i])el.textContent=days[i];});
  const warnBox=document.querySelector('#dash-trabajador [style*="red-dim"]');if(warnBox)warnBox.textContent=t.warn_box;
  if(wPanels[1]){const pt=wPanels[1].querySelector('.panel-title');if(pt)pt.textContent=t.panel_dose;const gs=wPanels[1].querySelector('.gauge-sub');if(gs)gs.textContent=t.dose_label;}
  if(wPanels[2]){
    const pt=wPanels[2].querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');if(tag)tag.textContent=t.tag_verif;pt.childNodes[0].textContent=t.panel_sunafil+' ';}
    const ths=wPanels[2].querySelectorAll('th');[t.th_date,t.th_max,t.th_dose,t.th_time,t.th_status].forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});
    const eb=wPanels[2].querySelector('button');if(eb)eb.textContent=t.btn_export_csv;
  }

  // KPI PROFESIONAL
  const kpiP=document.querySelectorAll('#dash-profesional .kpi-card');
  [['kpi_p1','kpi_p1_trend'],['kpi_p2','kpi_p2_trend'],['kpi_p3','kpi_p3_sub'],['kpi_p4','kpi_p4_trend']].forEach(([lk,tk],i)=>{
    if(!kpiP[i])return;const l=kpiP[i].querySelector('.kpi-label');if(l)l.textContent=t[lk];const tr=kpiP[i].querySelector('.kpi-trend');if(tr)tr.textContent=t[tk];
  });
  const pPanels=document.querySelectorAll('#dash-profesional .dash-panel');
  if(pPanels[0]){const pt=pPanels[0].querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.panel_patients+' ';if(tag)tag.textContent=t.tag_clinical;}
    const ths=pPanels[0].querySelectorAll('th');[t.th_patient,t.th_sector,t.th_exposure,t.th_dose,t.th_risk].forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});}
  if(pPanels[1]){
    const pt=pPanels[1].querySelector('.panel-title');if(pt)pt.textContent=t.panel_risk_dist;
    const genBtn=pPanels[1].querySelector('.btn-secondary');if(genBtn)genBtn.textContent=t.btn_gen_report;
    const progItems=pPanels[1].querySelectorAll('.prog-item .prog-header span:first-child');
    const rdKeys=['riskdist_critical','riskdist_high','riskdist_moderate','riskdist_safe'];
    progItems.forEach((el,i)=>{if(rdKeys[i]&&t[rdKeys[i]])el.textContent=t[rdKeys[i]];});
  }
  // PANEL DE COMPARACIÓN HISTÓRICA (profesional)
  const histPanel2=document.getElementById('histComparePanel');
  if(histPanel2){
    const pt=histPanel2.querySelector('.panel-title');
    if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.panel_hist_compare+' ';if(tag)tag.textContent=t.tag_6months;}
    const legendSpans=histPanel2.querySelectorAll('.chart-risk-legend>span');
    const legendKeys=['legend_normal','legend_moderate_risk','legend_high_risk'];
    legendSpans.forEach((el,i)=>{if(!legendKeys[i])return;const dot=el.querySelector('.risk-dot');el.textContent=' '+t[legendKeys[i]];if(dot)el.prepend(dot);});
    const months=(t.months_short||'Jan,Feb,Mar,Apr,May,Jun').split(',');
    const monthLabels=histPanel2.querySelectorAll('#histCompareLabels span');
    monthLabels.forEach((el,i)=>{const m=months[Math.floor(i/2)];if(m)el.textContent=m;});
    // Datos fijos de la maqueta (promedio/máximo por mes) — se reconstruyen los tooltips traducidos.
    const monthData=[[58,'tt_risk_normal',70,'tt_risk_moderate'],[55,'tt_risk_normal',74,'tt_risk_moderate'],[71,'tt_risk_moderate',87,'tt_risk_high'],[57,'tt_risk_normal',93,'tt_risk_high'],[69,'tt_risk_moderate',95,'tt_risk_high'],[53,'tt_risk_normal',73,'tt_risk_moderate']];
    const bars=histPanel2.querySelectorAll('#histCompareBars .chart-bar');
    monthData.forEach(([avg,avgKey,max,maxKey],i)=>{
      const m=months[i];
      const avgBar=bars[i*2],maxBar=bars[i*2+1];
      if(avgBar)avgBar.title=`${m} (${t.tt_avg}): ${avg} dB — ${t[avgKey]}`;
      if(maxBar)maxBar.title=`${m} (${t.tt_max}): ${max} dB — ${t[maxKey]}`;
    });
    const peakFlag=document.getElementById('chartPeakFlag');
    if(peakFlag){const strong=peakFlag.querySelector('strong');if(strong)strong.textContent=t.tt_risk_high;peakFlag.childNodes[0].textContent=t.chart_peak_prefix+' '+(months[4]||'May')+' · ';}
    const caption=document.getElementById('histCompareCaption');if(caption)caption.textContent=t.hist_compare_caption;
  }
  // PANEL DE RECOMENDACIONES PREVENTIVAS (profesional)
  const preventPanel=document.getElementById('preventPanel');
  if(preventPanel){
    const pt=preventPanel.querySelector('.panel-title');if(pt)pt.textContent=t.panel_prevent;
    const pItems=preventPanel.querySelectorAll('.alert-item');
    const pData=[['prevent1_p','prevent1_s'],['prevent2_p','prevent2_s'],['prevent3_p','prevent3_s'],['prevent4_p','prevent4_s']];
    pItems.forEach((item,i)=>{if(!pData[i])return;const p=item.querySelector('.alert-body p');const s=item.querySelector('.alert-body small');if(p)p.textContent=t[pData[i][0]];if(s)s.textContent=t[pData[i][1]];});
  }
  updatePatientKPIs();

  // MAPA PANEL
  const mapPanel=document.querySelector('#dp-mapa .dash-panel');
  if(mapPanel){
    const pt=mapPanel.querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.map_panel_title+' ';if(tag)tag.textContent=t.tag_live;}
    const btns=mapPanel.querySelectorAll('.ctrl-btn');
    if(btns[0])btns[0].textContent=t.btn_refresh;if(btns[1])btns[1].textContent=t.btn_add_point;if(btns[2])btns[2].textContent=t.btn_export_map;
    const hint=document.getElementById('addPointHint');if(hint)hint.textContent=t.add_point_hint;
  }

  // HISTORIAL PANEL
  const histPanel=document.querySelector('#dp-historial .dash-panel');
  if(histPanel){
    const pt=histPanel.querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.hist_title+' ';if(tag)tag.textContent=t.tag_30days;}
    const btns=histPanel.querySelectorAll('.ctrl-btn');
    if(btns[0])btns[0].textContent=t.btn_filter_date;if(btns[1])btns[1].textContent=t.btn_clear_filter;if(btns[2])btns[2].textContent=t.btn_export_csv;
    const ths=histPanel.querySelectorAll('th');[t.th_date,t.th_max,t.th_avg,t.th_dose,t.th_exptime,t.th_status].forEach((v,i)=>{if(ths[i])ths[i].textContent=v;});
  }

  // ALERTAS PANEL
  const kpiA=document.querySelectorAll('#dp-alertas .kpi-card');
  [['kpi_a1','kpi_a1_trend'],['kpi_a2','kpi_a2_trend'],['kpi_a3','kpi_a3_trend'],['kpi_a4','kpi_a4_trend']].forEach(([lk,tk],i)=>{
    if(!kpiA[i])return;const l=kpiA[i].querySelector('.kpi-label');if(l)l.textContent=t[lk];const tr=kpiA[i].querySelector('.kpi-trend');if(tr)tr.textContent=t[tk];
  });
  const alertsPanel=document.querySelector('#dp-alertas .dash-panel');
  if(alertsPanel){
    const pt=alertsPanel.querySelector('.panel-title');if(pt){const tag=pt.querySelector('.pt-tag');pt.childNodes[0].textContent=t.alerts_center_title+' ';if(tag)tag.textContent=t.tag_active;}
    const panelBtns=alertsPanel.querySelectorAll('.ctrl-btn');
    if(panelBtns[0])panelBtns[0].textContent=t.btn_mark_read;if(panelBtns[1])panelBtns[1].textContent=t.btn_config_alerts;
    const aItems=alertsPanel.querySelectorAll('.alert-item');
    const aData=[['falert1_p','falert1_s'],['falert2_p','falert2_s'],['falert3_p','falert3_s'],['falert4_p','falert4_s']];
    aItems.forEach((item,i)=>{
      if(!aData[i])return;const ab=item.querySelector('.alert-body');if(!ab)return;
      const p=ab.querySelector('p');if(p)p.textContent=t[aData[i][0]];
      const s=ab.querySelector('small');if(s)s.textContent=t[aData[i][1]];
      const rb=item.querySelector('[onclick*="resolveAlert"]');if(rb)rb.textContent=t.btn_resolve;
      const pb=item.querySelector('[onclick*="postponeAlert"]');if(pb)pb.textContent=t.btn_postpone;
    });
  }

  // CONFIGURAR PANEL
  const cfgPanels=document.querySelectorAll('#dp-configurar .dash-panel');
  if(cfgPanels[0]){
    const pt=cfgPanels[0].querySelector('.panel-title');if(pt)pt.textContent=t.config_alerts_title;
    const rows=cfgPanels[0].querySelectorAll('[style*="space-between"]');
    const cfgData=[['cfg_threshold_h','cfg_threshold_s'],['cfg_push_h','cfg_push_s'],['cfg_email_h','cfg_email_s'],['cfg_night_h','cfg_night_s']];
    rows.forEach((row,i)=>{if(!cfgData[i])return;const p=row.querySelector('p');if(p)p.textContent=t[cfgData[i][0]];const sm=row.querySelector('small');if(sm)sm.textContent=t[cfgData[i][1]];});
  }
  if(cfgPanels[1]){
    const pt=cfgPanels[1].querySelector('.panel-title');if(pt)pt.textContent=t.zones_title;
    // Zone names/subtitles/status tags for all 3 segments (citizen, worker, professional) now
    // carry their own data-i18n attributes directly in the markup (zone_ciu*_n/s, zone_trab*_n/s,
    // zone_prof*_n/s, zone_active/zone_moderate/zone_critical) and are translated by the generic
    // '[data-i18n]' loop above. We used to grab only the first 3 '.zone-item' rows here with
    // querySelectorAll, which silently matched the citizen zones no matter which segment's list
    // was actually visible — the worker and professional zone lists were never translated. Do not
    // reintroduce positional zi[0]/zi[1]/zi[2] selection here.
    const azb=cfgPanels[1].querySelector('.ctrl-btn');if(azb)azb.textContent=t.btn_add_zone;
  }
  const prefsPanel=document.querySelector('#dp-configurar>div:last-child');
  if(prefsPanel){
    const pt=prefsPanel.querySelector('.panel-title');if(pt)pt.textContent=t.prefs_title;
    const prefDivs=prefsPanel.querySelectorAll('[style*="navy-mid"]');
    if(prefDivs[0]){const p=prefDivs[0].querySelector('p:last-of-type');if(p)p.textContent=t.pref_theme;const b=prefDivs[0].querySelector('button');if(b)b.textContent=t.btn_change_theme;}
    if(prefDivs[1]){const p=prefDivs[1].querySelector('p:last-of-type');if(p)p.textContent=t.pref_lang;}
    if(prefDivs[2]){const p=prefDivs[2].querySelector('p:last-of-type');if(p)p.textContent=t.pref_unit;}
    const sb=prefsPanel.querySelector('[onclick*="saveAppPreferences"]');if(sb)sb.textContent=t.btn_save_prefs;
  }

  // PERFIL PANEL
  const profLabels=document.querySelectorAll('.profile-field label');
  ['label_name','label_lastname','label_email','label_phone','label_city','label_segment'].forEach((k,i)=>{if(profLabels[i])profLabels[i].textContent=t[k];});
  const spb=document.querySelector('[onclick="saveProfile()"]');if(spb)spb.textContent=t.btn_save_profile;
  const cpb=document.querySelector('[onclick="changePassword()"]');if(cpb)cpb.textContent=t.btn_change_pass;
  const actTitle=document.querySelector('#dp-perfil .dash-panel .panel-title');if(actTitle)actTitle.textContent=t.prof_activity_title;
  const actDivs=document.querySelectorAll('#dp-perfil .dash-panel div[style*="muted"]');
  if(actDivs[0])actDivs[0].textContent=t.prof_sessions;
  if(actDivs[1])actDivs[1].textContent=t.prof_alerts_recv;
  if(actDivs[2])actDivs[2].textContent=t.prof_reports;

  // LANG BUTTONS
  document.querySelectorAll('.lang-opt').forEach(b=>b.classList.remove('active'));
  const activeLangBtn=document.getElementById('lopt-'+lang);if(activeLangBtn)activeLangBtn.classList.add('active');
  document.getElementById('langMenu').classList.remove('open');
  if(!silent)showToast(lang==='es'?'🌐 Idioma: Español':lang==='en'?'🌐 Language: English':'🌐 语言: 中文');
}
function applyLanguage(lang){setLang(lang);}

function toggleLangMenu(){document.getElementById('langMenu').classList.toggle('open');}
document.addEventListener('click',e=>{if(!e.target.closest('.lang-selector')){const m=document.getElementById('langMenu');if(m)m.classList.remove('open');}});
let currentUnit='dB_SPL';
const UNIT_OFFSETS={dB_SPL:0,dBA:-2,dBC:3};
const UNIT_LABELS={dB_SPL:'dB',dBA:'dB(A)',dBC:'dB(C)'};
function unitSuffix(){return UNIT_LABELS[currentUnit]||'dB';}
function convertDbValue(base){return Math.round(base+(UNIT_OFFSETS[currentUnit]||0));}

function refreshAllDbDisplays(){
  document.querySelectorAll('.db-auto').forEach(el=>{
    const base=parseFloat(el.dataset.db);
    if(!isNaN(base))el.textContent=convertDbValue(base);
  });
  document.querySelectorAll('.db-unit-auto').forEach(el=>{el.textContent=' '+unitSuffix();});
  // Umbral de alerta (panel Configurar) — mantiene el número elegido por el usuario,
  // solo actualiza el sufijo de unidad
  const thresholdSlider=document.getElementById('thresholdSlider');
  const thresholdLabel=document.getElementById('thresholdValLabel');
  if(thresholdSlider && thresholdLabel)thresholdLabel.textContent=thresholdSlider.value+' '+unitSuffix();
  // Refresca marcadores del mapa (si ya están creados) para que su popup use la unidad activa
  if(typeof refreshMapMarkersUnit==='function')refreshMapMarkersUnit();
}

function applyUnit(unit){
  currentUnit=unit;
  refreshAllDbDisplays();
  const labels={'dB_SPL':'📊 Unit: dB (SPL) — sound pressure level','dBA':'📊 Unit: dB(A) — A-weighted (most common use)','dBC':'📊 Unit: dB(C) — C-weighted (impact sounds)'};
  showToast(labels[unit]||'Unit updated');
}

// ── Envuelve automáticamente cualquier "NN dB" dentro de #dashboard en spans
function wrapDbValues(root){
  if(!root)return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{
    acceptNode(node){
      if(!node.nodeValue||!/\d+(?:\.\d+)?\s?dB\b/.test(node.nodeValue))return NodeFilter.FILTER_REJECT;
      if(node.parentElement && node.parentElement.closest('.no-db-wrap'))return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }
  });
  const nodes=[];
  let n;
  while(n=walker.nextNode())nodes.push(n);
  const re=/(\d+(?:\.\d+)?)\s?dB\b/g;
  nodes.forEach(node=>{
    const text=node.nodeValue;
    const frag=document.createDocumentFragment();
    let last=0,m;
    re.lastIndex=0;
    while(m=re.exec(text)){
      frag.appendChild(document.createTextNode(text.slice(last,m.index)));
      const numSpan=document.createElement('span');
      numSpan.className='db-auto';
      numSpan.dataset.db=m[1];
      numSpan.textContent=m[1];
      frag.appendChild(numSpan);
      const unitSpan=document.createElement('span');
      unitSpan.className='db-unit-auto';
      unitSpan.textContent=' dB';
      frag.appendChild(unitSpan);
      last=re.lastIndex;
    }
    frag.appendChild(document.createTextNode(text.slice(last)));
    node.parentNode.replaceChild(frag,node);
  });
}
function saveAppPreferences(){
  const lang=document.getElementById('appLanguage');
  const unit=document.getElementById('appUnit');
  const langName=lang?lang.options[lang.selectedIndex].text:'English';
  const unitName=unit?unit.options[unit.selectedIndex].text:'dB (SPL)';
  showToast('✅ Preferences saved: '+langName+' · '+unitName);
}

// ── Button Functions ──
function saveProfile(){
  const n=document.getElementById('pfNombre').value.trim();
  const a=document.getElementById('pfApellido').value.trim();
  const e=document.getElementById('pfEmail').value.trim();
  if(!n||!a){showToast('⚠️ First and last name are required');return;}
  if(!e.includes('@')){showToast('⚠️ Invalid email: missing "@"');return;}
  const full=n+' '+a;
  document.getElementById('profileName').textContent=full;
  document.getElementById('profileEmail').textContent=e;
  document.getElementById('dashUserLabel').textContent=full;
  document.getElementById('dashAvatar').textContent=(n[0]||'')+(a[0]||'');
  document.getElementById('profileAvatarLg').textContent=(n[0]||'')+(a[0]||'');
  showToast('✅ Profile updated: '+full);
}

function changePassword(){
  const e=document.getElementById('pfEmail').value.trim();
  if(!e||!e.includes('@')){showToast('⚠️ Invalid email. Check the email field.');return;}
  showToast('📧 Password reset email sent to: '+e);
}

// ── Zonas de monitoreo — ahora totalmente funcional ──
function addZone(){
  const name=prompt('Name of the new zone (e.g. Work, Gym, University):');
  if(!name||!name.trim()){showToast('⚠️ Enter a valid name for the zone');return;}
  const addr=prompt('Address or reference (e.g. Miraflores, Lima):');
  if(!addr||!addr.trim()){showToast('⚠️ Enter a valid address or reference');return;}
  const dbStr=prompt('Approximate noise level in that zone, in dB (e.g. 70):');
  const db=parseFloat(dbStr);
  if(isNaN(db)||db<30||db>140){showToast('⚠️ Invalid noise level. Must be between 30 and 140 dB');return;}
  let riskClass,riskLabel;
  if(db>=85){riskClass='tag-red';riskLabel='Critical';}
  else if(db>=65){riskClass='tag-amber';riskLabel='Moderate';}
  else{riskClass='tag-green';riskLabel='Safe';}
  const list=document.getElementById('zones'+pendingSeg.charAt(0).toUpperCase()+pendingSeg.slice(1));
  if(!list){showToast('⚠️ Zone list not found');return;}
  const item=document.createElement('div');
  item.className='zone-item';
  item.style.cssText='padding:12px;background:var(--navy-mid);border-radius:var(--radius-md);display:flex;justify-content:space-between;align-items:center;gap:10px;';
  item.innerHTML=`<div><p style="font-weight:600;font-size:.9rem;">📍 ${name.trim()}</p><small style="color:var(--muted);">${addr.trim()} · ${db} dB</small></div>
    <div style="display:flex;align-items:center;gap:8px;">
      <span class="tag ${riskClass}">${riskLabel}</span>
      <button class="ctrl-btn ctrl-btn-red" style="padding:5px 10px;font-size:.72rem;" onclick="this.closest('.zone-item').remove();showToast('🗑️ Zone deleted')" title="Delete zone">✕</button>
    </div>`;
  list.insertBefore(item,list.querySelector('button'));
  wrapDbValues(item);
  refreshAllDbDisplays();
  showToast('✅ Zone "'+name.trim()+'" added successfully');
}

function configureAlerts(){
  showDashPanel('configurar');
  showToast('⚙️ Alert configuration panel opened');
}

function markAllRead(){
  document.querySelectorAll('.notif-dot').forEach(d=>d.style.display='none');
  showToast('✅ All alerts marked as read');
}

function exportPDF(){
  const name=document.getElementById('profileName')?.textContent||'User';
  const now=new Date();
  const dateStr=now.toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
  const timeStr=now.toLocaleTimeString('en-US',{hour:'2-digit',minute:'2-digit'});
  const content=`============================================================
  AudioSafe REPORT — Sound Exposure History
============================================================
User        : ${name}
Date        : ${dateStr} ${timeStr}
Segment     : ${document.getElementById('pfSegmento')?.value||'Citizen'}
Email       : ${document.getElementById('profileEmail')?.textContent||'—'}
------------------------------------------------------------
EXPOSURE HISTORY — LAST 7 DAYS
------------------------------------------------------------
Date               Max Level   Avg Level    Dose    Time       Status
Thu Jun 18, 2026   92 dB       78 dB        87%     5h 40m     High risk
Wed Jun 17, 2026   95 dB       82 dB        102%    6h 20m     Exceeds limit
Tue Jun 16, 2026   88 dB       75 dB        74%     4h 50m     Moderate
Mon Jun 15, 2026   76 dB       62 dB        38%     2h 10m     Safe
Sun Jun 14, 2026   60 dB       52 dB        18%     1h 20m     Safe
Sat Jun 13, 2026   85 dB       74 dB        65%     4h 00m     Moderate
Fri Jun 12, 2026   90 dB       80 dB        91%     5h 10m     High risk
------------------------------------------------------------
SUMMARY
------------------------------------------------------------
Maximum level recorded  : 95 dB (Wed Jun 17, 2026)
Maximum dose            : 102% — Exceeds SUNAFIL limit
Days at high risk       : 3 out of 7
Total exposure          : 26h 00m over 7 days

Reference threshold     : 85 dB (Law 29783 / SUNAFIL)
Safe daily limit        : 8h at 85 dB
------------------------------------------------------------
RECOMMENDATIONS
------------------------------------------------------------
• Use hearing protection during shifts >85 dB
• Take hearing breaks every 2h of exposure
• See an ENT specialist if exposure persists
------------------------------------------------------------
Generated by AudioSafe v4.0 — audiosafe.pe
UPC IHC & Mobile Technologies · Lima, Peru
============================================================`;
  const blob=new Blob([content],{type:'text/plain;charset=utf-8'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download='AudioSafe_Report_'+name.replace(/ /g,'_')+'_'+now.toISOString().slice(0,10)+'.txt';
  a.click();
  URL.revokeObjectURL(url);
  showToast('✅ TXT report downloaded successfully');
}

// ── Utilidades genéricas de exportación CSV ──
function tableToCSVRows(table){
  if(!table)return [];
  return [...table.querySelectorAll('tr')]
    .filter(row=>row.style.display!=='none')
    .map(row=>[...row.children].map(cell=>cell.textContent.replace(/\s+/g,' ').trim()));
}
function rowsToCSV(rows){
  return rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\r\n');
}
function downloadCSV(filename,csvContent){
  const blob=new Blob(['\ufeff'+csvContent],{type:'text/csv;charset=utf-8;'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  URL.revokeObjectURL(url);
}
function dateStamp(){return new Date().toISOString().slice(0,10);}

// Exporta la tabla indicada (por id) a un archivo Excel/CSV real y descargable.
function exportCSV(tableId){
  const table=tableId?document.getElementById(tableId):document.querySelector('.data-table');
  if(!table){showToast('⚠️ Could not find the table to export');return;}
  const rows=tableToCSVRows(table);
  if(!rows.length){showToast('⚠️ No visible data to export');return;}
  downloadCSV('AudioSafe_History_'+dateStamp()+'.csv',rowsToCSV(rows));
  showToast('📊 History exported to CSV (Excel) successfully');
}

function exportMap(){
  showToast('🗺️ Exporting noise map to PDF... Ready in a moment');
}

function filterByDate(){
  const desde=prompt('Start date (mm/dd/yyyy):');
  if(!desde){showToast('⚠️ Enter a valid start date');return;}
  const hasta=prompt('End date (mm/dd/yyyy):');
  if(!hasta){showToast('⚠️ Enter a valid end date');return;}
  const parseDate=s=>{const p=s.split('/');if(p.length!==3)return null;return new Date(+p[2],+p[0]-1,+p[1]);};
  const dStart=parseDate(desde);const dEnd=parseDate(hasta);
  if(!dStart||isNaN(dStart)||!dEnd||isNaN(dEnd)){showToast('⚠️ Invalid date format. Use mm/dd/yyyy');return;}
  if(dStart>dEnd){showToast('⚠️ The start date must be before the end date');return;}
  const tables=document.querySelectorAll('.data-table tbody');
  let shown=0,hidden=0;
  tables.forEach(tbody=>{
    tbody.querySelectorAll('tr').forEach(row=>{
      const cell=row.cells[0];if(!cell)return;
      const txt=cell.textContent.trim();
      // Try to parse date from cell (various formats)
      const monthsEN={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};
      // Pattern: "Thu Jun 18, 2026" or "Today · Thu Jun 18"
      const m=txt.match(/([A-Za-z]{3,})\s+(\d{1,2}),?\s+(\d{4})/);
      if(m){
        const mon=monthsEN[m[1].slice(0,3)]??0;const day=+m[2];const yr=+m[3];
        const rowDate=new Date(yr,mon,day);
        const visible=rowDate>=dStart&&rowDate<=dEnd;
        row.style.display=visible?'':'none';
        if(visible)shown++;else hidden++;
      }
    });
  });
  showToast(`📅 Filter applied: ${desde} → ${hasta} (${shown} rows visible)`);
}
function resetDateFilter(){
  document.querySelectorAll('.data-table tbody tr').forEach(r=>r.style.display='');
  showToast('🔄 Date filter cleared');
}

// ── Add noise point via map click (drag-to-place) ──
let addPointMode=false;
let addPointMarker=null;
function activateAddPoint(){
  if(!mapFull){showToast('🗺️ First open the Map panel');return;}
  addPointMode=true;
  document.getElementById('addPointHint').style.display='inline-flex';
  document.getElementById('btnAddPoint').style.background='var(--cyan)';
  document.getElementById('btnAddPoint').style.color='var(--navy)';
  showToast('📍 Click on the map to place your noise point');
  mapFull.once('click',function(e){
    addPointMode=false;
    document.getElementById('addPointHint').style.display='none';
    document.getElementById('btnAddPoint').style.background='';
    document.getElementById('btnAddPoint').style.color='';
    const db=prompt('Approximate noise level in dB (e.g. 82):');
    const dbNum=parseFloat(db);
    if(isNaN(dbNum)||dbNum<30||dbNum>140){showToast('⚠️ Invalid noise level. Must be between 30 and 140 dB');return;}
    const loc=prompt('Name of the place (e.g. Av. Brasil, Lima):');
    if(!loc||!loc.trim()){showToast('⚠️ Enter a valid place name');return;}
    const risk=dbNum>=85?'red':dbNum>=65?'amber':'green';
    const col=colorMap[risk];
    const icon=L.divIcon({html:`<div style="width:16px;height:16px;background:${col};border:2.5px solid #fff;border-radius:50%;box-shadow:0 0 10px ${col}"></div>`,iconSize:[16,16],iconAnchor:[8,8],className:''});
    const marker=L.marker([e.latlng.lat,e.latlng.lng],{icon,draggable:true}).addTo(mapFull);
    marker._noisePt={lat:e.latlng.lat,lng:e.latlng.lng,db:dbNum,name:loc.trim(),risk};
    allNoiseMarkers.push(marker);
    marker.bindPopup(`<b>📍 ${loc.trim()}</b><br>🔊 ${convertDbValue(dbNum)} ${unitSuffix()}<br><span style="color:${col}">● ${risk==='red'?'Critical':risk==='amber'?'Moderate':'Safe'}</span><br><small style="color:#888">You can drag this marker</small>`).openPopup();
    showToast('✅ Point added: '+loc.trim()+' — '+dbNum+' dB');
  });
}
function addNoisePoint(){activateAddPoint();}
function refreshMapPoints(){const t=i18n[currentLang]||i18n.es;showToast(t.toast_updating_map||'🔄 Updating map points...');}


// ── Generar informe — ahora descarga un CSV/Excel real ──
function generateReport(){
  const name=document.getElementById('profileName')?.textContent||'User';
  const now=new Date();
  const activeDash=document.querySelector('.seg-dash.active');
  const rows=[['AudioSafe — Report'],['User',name],['Date',now.toLocaleString('en-US')],['Unit of measurement',unitSuffix()],[]];

  if(activeDash){
    rows.push(['Indicator','Value']);
    activeDash.querySelectorAll('.kpi-card').forEach(card=>{
      const label=card.querySelector('.kpi-label')?.textContent.trim()||'';
      const value=card.querySelector('.kpi-value')?.textContent.trim().replace(/\s+/g,' ')||'';
      rows.push([label,value]);
    });
  }

  const patientTable=document.getElementById('tablePacientes');
  if(patientTable && activeDash && activeDash.id==='dash-profesional'){
    rows.push([]);
    rows.push(['Patient panel']);
    tableToCSVRows(patientTable).forEach(r=>rows.push(r));
  }

  const sunafilTable=document.getElementById('tableHistorialSunafil');
  if(sunafilTable && activeDash && activeDash.id==='dash-trabajador'){
    rows.push([]);
    rows.push(['Daily exposure history (SUNAFIL)']);
    tableToCSVRows(sunafilTable).forEach(r=>rows.push(r));
  }

  downloadCSV('AudioSafe_Report_'+name.replace(/\s+/g,'_')+'_'+dateStamp()+'.csv',rowsToCSV(rows));
  showToast('✅ Report downloaded in CSV (Excel) format');
}

// ── Registro de pacientes por especialistas de salud ──
function addPatient(){
  const nombre=prompt('Patient name and age (e.g. Rosa T. · 40y):');
  if(!nombre||!nombre.trim()){showToast('⚠️ Enter a valid name');return;}
  const sector=prompt('Patient sector or activity (e.g. Construction, Office):');
  if(!sector||!sector.trim()){showToast('⚠️ Enter a valid sector');return;}
  const dbStr=prompt('Recorded exposure level, in dB (e.g. 82):');
  const db=parseFloat(dbStr);
  if(isNaN(db)||db<30||db>140){showToast('⚠️ Invalid noise level. Must be between 30 and 140 dB');return;}
  const table=document.getElementById('tablePacientes');
  if(!table){showToast('⚠️ Patient panel not found');return;}
  const dosis=Math.min(999,Math.round((db/85)*100));
  let riskClass,riskLabel;
  if(db>=90){riskClass='tag-red';riskLabel='Critical';}
  else if(db>=85){riskClass='tag-red';riskLabel='High';}
  else if(db>=65){riskClass='tag-amber';riskLabel='Moderate';}
  else{riskClass='tag-green';riskLabel='Safe';}
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${nombre.trim()}</td><td>${sector.trim()}</td><td>${db} dB</td><td>${dosis}%</td><td><span class="tag ${riskClass}">${riskLabel}</span></td>`;
  table.querySelector('tbody').appendChild(tr);
  wrapDbValues(tr);
  refreshAllDbDisplays();
  updatePatientKPIs();
  showToast('✅ Patient registered: '+nombre.trim());
}

// Recalcula KPIs y distribución de riesgo del panel profesional a partir de la tabla real
function updatePatientKPIs(){
  const table=document.getElementById('tablePacientes');
  if(!table)return;
  const t=i18n[currentLang]||i18n.es;
  const rows=[...table.querySelectorAll('tbody tr')];
  const counts={status_critical:0,status_high:0,status_moderate:0,status_safe:0};
  rows.forEach(r=>{
    const tag=r.querySelector('.tag');
    const key=tag?tag.getAttribute('data-i18n'):'';
    if(key&&counts.hasOwnProperty(key))counts[key]++;
  });
  const total=rows.length;
  const enRiesgo=counts.status_critical+counts.status_high;
  const profDash=document.getElementById('dash-profesional');
  if(profDash){
    const kpiCards=profDash.querySelectorAll('.kpi-grid .kpi-card .kpi-value');
    if(kpiCards[0])kpiCards[0].textContent=total;
    if(kpiCards[1])kpiCards[1].textContent=enRiesgo;
  }
  const progItems=document.querySelectorAll('#dash-profesional .prog-item');
  const order=['status_critical','status_high','status_moderate','status_safe'];
  const patientWord=(n)=>n===1?(t.label_patient||'patient'):(t.label_patients||'patients');
  progItems.forEach((item,i)=>{
    const key=order[i];
    const count=counts[key]||0;
    const pct=total?Math.round((count/total)*100):0;
    const headerSpans=item.querySelectorAll('.prog-header span');
    if(headerSpans[1])headerSpans[1].textContent=count+' '+patientWord(count);
    const fill=item.querySelector('.prog-fill');
    if(fill)fill.style.width=pct+'%';
  });
}

function shareLocation(){showToast('📍 Location and sound level shared with the community');}

function resolveAlert(btn){
  const item=btn.closest('.alert-item');
  if(item){item.style.opacity='0.4';item.style.pointerEvents='none';}
  showToast('✅ Alert resolved successfully');
}

function postponeAlert(btn){
  const item=btn.closest('.alert-item');
  showToast('⏰ Alert postponed for 2 hours');
}

function sendContactForm(){
  const nombre=document.querySelector('.cf-group input[placeholder="Your first name"]')?.value.trim();
  const apellido=document.querySelector('.cf-group input[placeholder="Your last name"]')?.value.trim();
  const email=document.querySelector('.cf-group input[type="email"]')?.value.trim();
  if(!nombre){showToast('⚠️ Enter your first name in the contact form');return;}
  if(!email||!email.includes('@')){showToast('⚠️ Invalid email: must include "@" (e.g. name@email.com)');return;}
  showToast('✅ Message sent successfully. We will contact you within 24h.');
}

// ── Glanceable UI (perfil Trabajador) ──
function toggleWorkerDetail(){
  const detail=document.getElementById('workerDetail');
  const btn=document.getElementById('glanceToggleBtn');
  if(!detail||!btn)return;
  const showing=detail.style.display!=='none';
  detail.style.display=showing?'none':'block';
  btn.textContent=showing?'📊 View detailed panel':'✕ Hide detailed panel';
}

// ── Dashboard panels ──
function showDashPanel(panel){
  ['panel','mapa','historial','alertas','configurar','perfil'].forEach(p=>{
    const el=document.getElementById('dp-'+p);
    if(el)el.style.display=p===panel?'block':'none';
  });
  document.querySelectorAll('.dash-nav-links a').forEach(a=>a.classList.remove('active'));
  const activeLink=document.getElementById('dn-'+panel);
  if(activeLink)activeLink.classList.add('active');
  if(panel==='mapa')setTimeout(()=>initFullMap(),200);
}

// ── Monitor controls ──
let monitoring=true;
let micStream=null;
function requestMicAccess(){
  const banner=document.getElementById('micErrorBanner');
  if(!navigator.mediaDevices||!navigator.mediaDevices.getUserMedia){
    if(banner){banner.style.display='flex';const t=banner.querySelector('.mic-error-text');if(t)t.textContent='🎙️ Your browser does not support microphone access. Try a recent version of Chrome, Firefox or Edge.';}
    return;
  }
  navigator.mediaDevices.getUserMedia({audio:true})
    .then(stream=>{
      micStream=stream;
      if(banner)banner.style.display='none';
    })
    .catch(()=>{
      // El monitoreo simulado sigue funcionando: el error de permisos nunca bloquea la interfaz.
      if(banner){const t=banner.querySelector('.mic-error-text');if(t)t.textContent='🎙️ We couldn\'t access your microphone. Enable permissions in your browser settings.';banner.style.display='flex';}
    });
}
function retryMicAccess(){showToast('🎙️ Requesting microphone access...');requestMicAccess();}
function toggleMonitor(){
  monitoring=!monitoring;
  const btn=document.getElementById('btnStop');
  if(monitoring){btn.textContent='⏹ Stop monitoring';btn.className='ctrl-btn ctrl-btn-red';showToast('▶️ Monitoring started');requestMicAccess();}
  else{
    btn.textContent='▶️ Start monitoring';btn.className='ctrl-btn ctrl-btn-green';showToast('⏹ Monitoring stopped');
    const banner=document.getElementById('micErrorBanner');if(banner)banner.style.display='none';
    if(micStream){micStream.getTracks().forEach(tr=>tr.stop());micStream=null;}
  }
}

// Puntos de ruido reales en Lima
const noisePts=[
  {lat:-12.0688,lng:-77.0476,db:94,name:'Av. Javier Prado Este',risk:'red'},
  {lat:-12.0833,lng:-77.0458,db:91,name:'Av. La Marina',risk:'red'},
  {lat:-12.0565,lng:-77.0370,db:88,name:'Av. Brasil',risk:'red'},
  {lat:-12.0731,lng:-77.0644,db:85,name:'Av. Arequipa / Surco',risk:'amber'},
  {lat:-12.0400,lng:-77.0437,db:82,name:'Av. Tacna',risk:'amber'},
  {lat:-12.1219,lng:-77.0282,db:78,name:'Av. Benavides',risk:'amber'},
  {lat:-12.1079,lng:-77.0441,db:72,name:'Miraflores Centro',risk:'amber'},
  {lat:-12.0931,lng:-77.0259,db:58,name:'Parque Kennedy',risk:'green'},
  {lat:-12.0980,lng:-77.0170,db:55,name:'San Isidro El Olivar',risk:'green'},
  {lat:-12.0481,lng:-77.0628,db:60,name:'Breña',risk:'green'},
  {lat:-12.0699,lng:-77.0800,db:88,name:'Av. Venezuela',risk:'red'},
  {lat:-12.1186,lng:-77.0302,db:68,name:'Surquillo',risk:'amber'},
];
const colorMap={red:'#EF4444',amber:'#F59E0B',green:'#22C55E'};

let mapFull=null;
const allNoiseMarkers=[];
function createNoiseMarker(map,pt){
  const col=colorMap[pt.risk];
  const icon=L.divIcon({html:`<div style="width:14px;height:14px;background:${col};border:2px solid #fff;border-radius:50%;box-shadow:0 0 8px ${col}"></div>`,iconSize:[14,14],iconAnchor:[7,7],className:''});
  const marker=L.marker([pt.lat,pt.lng],{icon}).addTo(map);
  marker._noisePt=pt;
  marker.bindPopup(`<b>${pt.name}</b><br>🔊 ${convertDbValue(pt.db)} ${unitSuffix()}<br><span style="color:${col}">● ${pt.risk==='red'?'Critical':pt.risk==='amber'?'Moderate':'Safe'}</span>`);
  allNoiseMarkers.push(marker);
}
// Re-genera los popups de los marcadores fijos cuando cambia la unidad de medida
function refreshMapMarkersUnit(){
  allNoiseMarkers.forEach(marker=>{
    const pt=marker._noisePt;if(!pt)return;
    const col=colorMap[pt.risk];
    marker.setPopupContent(`<b>${pt.name}</b><br>🔊 ${convertDbValue(pt.db)} ${unitSuffix()}<br><span style="color:${col}">● ${pt.risk==='red'?'Critical':pt.risk==='amber'?'Moderate':'Safe'}</span>`);
  });
}

function initFullMap(){
  const tiles='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  if(!mapFull){
    const mf=document.getElementById('mapFull');
    if(mf){mapFull=L.map('mapFull',{zoomControl:true,scrollWheelZoom:true}).setView([-12.0731,-77.0465],12);L.tileLayer(tiles,{attribution:'© OpenStreetMap'}).addTo(mapFull);noisePts.forEach(p=>createNoiseMarker(mapFull,p));}
  } else {
    setTimeout(()=>mapFull.invalidateSize(),100);
  }
}

// Fix Leaflet icon path issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({iconRetinaUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',iconUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',shadowUrl:'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'});

// ── Reveal on scroll ──
const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});},{threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

// ── Inicialización de la unidad de medida ──
wrapDbValues(document.getElementById('dashboard'));
refreshAllDbDisplays();

// ── Idioma por defecto: Español ──
setLang('es', true);
