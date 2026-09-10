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

function updateEmailDisplay(val){const d=document.getElementById('loginEmailDisplay');if(val.length>3){d.textContent='👤 '+(currentLang==='es'?'Conectado como: ':currentLang==='en'?'Signed in as: ':'登录为: ')+val;d.classList.add('show');}else{d.classList.remove('show');}}

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
    errEl.textContent=i18n[currentLang].err_name_required||'⚠️ Please enter your first name.';
    errEl.style.display='block';
    nombreEl.focus();return;
  }
  if(!apellido){
    errEl.textContent=i18n[currentLang].err_lastname_required||'⚠️ Please enter your last name.';
    errEl.style.display='block';
    apellidoEl.focus();return;
  }
  if(!email){
    errEl.textContent=i18n[currentLang].err_email_required||'⚠️ Please enter your email address.';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  if(!email.includes('@')){
    errEl.textContent=i18n[currentLang].err_email_invalid_at||'⚠️ The email entered is not valid. It must include the "@" symbol (example: user@email.com).';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  const emailParts=email.split('@');
  if(emailParts.length!==2||!emailParts[0]||!emailParts[1]||!emailParts[1].includes('.')){
    errEl.textContent=i18n[currentLang].err_email_invalid_format||'⚠️ The email format is not valid. Correct example: user@email.com';
    errEl.style.display='block';
    emailEl.focus();return;
  }
  if(!pass||pass.length<6){
    errEl.textContent=i18n[currentLang].err_password_min||'⚠️ The password must be at least 6 characters long.';
    errEl.style.display='block';
    passEl.focus();return;
  }

  closeLogin();
  document.getElementById('landing').style.display='none';
  const dash=document.getElementById('dashboard');
  dash.classList.add('active');
  window.scrollTo(0,0);

  const fullName=nombre+' '+apellido;
  const segLabels=i18n[currentLang].seg_dash_labels||{ciudadano:'Citizen',trabajador:'Worker',profesional:'Health Professional'};
  const subs=i18n[currentLang].seg_dash_subs||{ciudadano:'Monitor your daily sound exposure in Lima',trabajador:'Occupational exposure record — Law No. 29783',profesional:'Clinical follow-up of patients exposed to noise'};
  const initials=(nombre[0]||'')+(apellido[0]||'');

  document.getElementById('dashAvatar').textContent=initials.toUpperCase();
  document.getElementById('dashUserLabel').textContent=fullName;
  document.getElementById('dashGreet').textContent=i18n[currentLang].dash_welcome_msg||'👋 Welcome, '+nombre;
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
    // Nuevas traducciones para el formulario de login
    err_name_required:'⚠️ Por favor ingresa tu nombre.',
    err_lastname_required:'⚠️ Por favor ingresa tu apellido.',
    err_email_required:'⚠️ Por favor ingresa tu correo electrónico.',
    err_email_invalid_at:'⚠️ El correo ingresado no es válido. Debe incluir el símbolo "@" (ejemplo: usuario@correo.com).',
    err_email_invalid_format:'⚠️ El formato del correo no es válido. Ejemplo correcto: usuario@correo.com',
    err_password_min:'⚠️ La contraseña debe tener al menos 6 caracteres.',
    // Nuevas traducciones para el dashboard
    seg_dash_labels:{ciudadano:'Ciudadano',trabajador:'Trabajador',profesional:'Profesional de salud'},
    seg_dash_subs:{ciudadano:'Monitorea tu exposición sonora diaria en Lima',trabajador:'Registro de exposición ocupacional — Ley N° 29783',profesional:'Seguimiento clínico de pacientes expuestos a ruido'},
    dash_welcome_msg:'👋 Bienvenido, ',
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
    // Nuevas traducciones para el formulario de login
    err_name_required:'⚠️ Please enter your first name.',
    err_lastname_required:'⚠️ Please enter your last name.',
    err_email_required:'⚠️ Please enter your email address.',
    err_email_invalid_at:'⚠️ The email entered is not valid. It must include the "@" symbol (example: user@email.com).',
    err_email_invalid_format:'⚠️ The email format is not valid. Correct example: user@email.com',
    err_password_min:'⚠️ The password must be at least 6 characters long.',
    // Nuevas traducciones para el dashboard
    seg_dash_labels:{ciudadano:'Citizen',trabajador:'Worker',profesional:'Health Professional'},
    seg_dash_subs:{ciudadano:'Monitor your daily sound exposure in Lima',trabajador:'Occupational exposure record — Law No. 29783',profesional:'Clinical follow-up of patients exposed to noise'},
    dash_welcome_msg:'👋 Welcome, ',
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
    chart_today:'历史记录 — 最近12小时',
    // Nuevas traducciones para el formulario de login
    err_name_required:'⚠️ 请输入您的名字。',
    err_lastname_required:'⚠️ 请输入您的姓氏。',
    err_email_required:'⚠️ 请输入您的电子邮件地址。',
    err_email_invalid_at:'⚠️ 输入的电子邮件无效。必须包含"@"符号（例如：user@email.com）。',
    err_email_invalid_format:'⚠️ 电子邮件格式无效。正确示例：user@email.com',
    err_password_min:'⚠️ 密码长度必须至少为6个字符。',
    // Nuevas traducciones para el dashboard
    seg_dash_labels:{ciudadano:'市民',trabajador:'工人',profesional:'健康专业人员'},
    seg_dash_subs:{ciudadano:'监测您在利马的每日声音暴露',trabajador:'职业暴露记录 — 第29783号法律',profesional:'暴露于噪音患者的临床随访'},
    dash_welcome_msg:'👋 欢迎， ',
  },
};
