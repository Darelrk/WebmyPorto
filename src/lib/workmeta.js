import casestudies from '../data/casestudies.json'

export default casestudies

// Registry per project: route, meta, blocks definition.
// Semua angka di casestudies.json berasal dari repo masing-masing (R-17).
export const WORK_META = {
  'autonomous-surface-vessel': {
    slug: 'autonomous-surface-vessel',
    repo: 'https://github.com/Darelrk/autonomous-surface-vessel',
    eyebrow: 'KKI 2026 · Computer vision · Autonomous systems',
    title: 'An ASV software stack from perception to ground control.',
    intro: 'A KKI 2026 autonomous-surface-vessel project combining buoy detection, visual gate guidance, a guarded MAVLink control path, and a web ground control station. The local demo uses simulated telemetry; physical course performance is not established here.',
    stats: [
      { value: '0.983', unit: 'reported mAP50(B)', label: 'repo test artifact for buoy detection; not independently reproduced' },
      { value: '2', unit: 'buoy classes', label: 'red and green targets for gate guidance' },
      { value: '10 Hz', unit: 'simulated telemetry', label: 'offline demo feed, not a measured vessel update rate' },
    ],
    image: {
      src: '/asv-dashboard.webp',
      alt: 'Screenshot of the ASV web ground control station from the project repository',
      caption: 'Dashboard screenshot from the project repository; this is not a live vessel feed.',
    },
    blocks: [
      { type: 'method-steps', title: 'From detection to guidance', note: 'The implemented software path, not a claim of completed on-water autonomy.', steps: [
        { n: '01', t: 'Detect', d: 'YOLO26n identifies red and green buoys in camera frames.' },
        { n: '02', t: 'Guide', d: 'Visual servoing turns the target gate position into a steering correction.' },
        { n: '03', t: 'Connect', d: 'The backend links telemetry and guarded control commands to a MAVLink interface.' },
        { n: '04', t: 'Monitor', d: 'A web ground control station shows the mission and telemetry; the offline demo can run with simulated data.' },
      ]},
      { type: 'why-list', title: 'Evidence and limits', items: [
        'The repository records mAP50(B) = 0.9834 on its buoy-detection test split. It is a stored model metric, not an independent field result.',
        'The dashboard screenshot and simulated telemetry demonstrate the interface without proving operation on a physical vessel.',
        'MAVLink and actuator-control paths are present in code, but a successful on-water KKI course run has not been verified.',
      ]},
    ],
  },
  'credit-gap-forecaster': {
    slug: 'credit-gap-forecaster',
    repo: 'https://github.com/Darelrk/credit-gap-forecaster',
    eyebrow: 'Time series · Macroprudential · Early warning',
    title: 'Watching Indonesia\'s credit cycle.',
    intro: 'An early-warning system for the Credit-to-GDP Gap: the macroprudential indicator that tells Bank Indonesia whether credit growth is running ahead of the real economy. Four models, one ensemble, a fan-chart outlook to 2027.',
    stats: [
      { value: '4', unit: 'models', label: 'LSTM attention, XGBoost, ARIMA, ensemble' },
      { value: '3', unit: 'pillars', label: 'total credit, real GDP, interest rate' },
      { value: '-20.5', unit: 'gap pts', label: 'ensemble outlook, Jul 2025' },
    ],
    blocks: [
      { type: 'fan-chart', title: 'Fan-chart outlook, 2025 to 2027', note: 'P10 to P90 band around the ensemble forecast. All values are percentage-point deviations from the HP-filter trend (Basel III standard).' },
      { type: 'method-steps', steps: [
        { n: '01', t: 'Decompose', d: 'HP filter separates trend from cyclical gap for each pillar.' },
        { n: '02', t: 'Forecast', d: 'Four engines run in parallel on the gap series and its drivers.' },
        { n: '03', t: 'Signal', d: 'Traffic-light EWI maps the gap zone to policy risk.' },
        { n: '04', t: 'Monitor', d: 'Fan chart tracks recovery speed out of the under-trend zone.' },
      ]},
    ],
    key: 'creditgap',
  },
  'Tabular-Synthesis-LLM': {
    slug: 'tabular-synthesis-llm',
    repo: 'https://github.com/Darelrk/Tabular-Synthesis-LLM',
    eyebrow: 'Synthetic data · LLM · Benchmark',
    title: 'LLMs that generate better tables than GANs.',
    intro: 'A controlled benchmark: can an LLM-based generator (GReaT) produce synthetic tabular data that trains a classifier better than the real thing? Measured with an XGBoost TSTR protocol on the Adult Census dataset, at a 3,000-sample budget.',
    stats: [
      { value: '93.53%', unit: 'accuracy', label: 'GReaT synthetic data, XGBoost downstream' },
      { value: '87.46%', unit: 'accuracy', label: 'the original 32,561-row dataset itself' },
      { value: '3,000', unit: 'rows', label: 'synthetic samples to reach it' },
    ],
    blocks: [
      { type: 'bar-compare', title: 'Downstream accuracy by framework', note: 'XGBoost classifier trained on each dataset (3,000 samples) and evaluated on held-out real data. The dashed line is the original-data baseline.' },
      { type: 'metric-table', title: 'Full benchmark card', note: 'AUC-ROC, precision, recall, F1 for every framework. GReaT leads on every axis.' },
      { type: 'why-list', title: 'Why the LLM wins', items: [
        'Semantic understanding: the model knows education relates to income, not just co-occurrence counts.',
        'Pre-trained knowledge: billions of tokens of world structure before the first synthetic row.',
        'Logical consistency: generated person profiles stay plausible, not just statistically close.',
        'Attention over columns: better handling of categorical relationships than GAN generators.',
      ]},
    ],
    key: 'tabular',
  },
  'mae-hybrid-imputation-study': {
    slug: 'mae-hybrid-imputation-study',
    repo: 'https://github.com/Darelrk/mae-hybrid-imputation-study',
    eyebrow: 'Missing data · Deep learning · Medicine',
    title: 'Imputing a clinical variable honestly.',
    intro: 'Heart-disease records arrive with a hole in a cardiovascular risk factor (fasting blood sugar, 9.8% missing). A masked autoencoder competes against KMeans, KNN, MissForest, and hybrids of itself. The simple architecture wins.',
    stats: [
      { value: '1.038', unit: 'RMSE', label: 'MAE baseline, mean over 45 runs' },
      { value: '0.946', unit: 'RMSE', label: 'best single run (fold 2, mask 0.2)' },
      { value: '45/45', unit: 'runs', label: '5-fold x 3 repeats x 3 mask rates' },
    ],
    blocks: [
      { type: 'method-bars', title: 'RMSE by method, 45 runs each', note: 'Lower is better. Deep learning (MAE) beats every pure-classical imputer and every hybrid that tries to be cleverer than it.' },
      { type: 'finding-list', title: 'What the study actually found', items: [
        'Simple architecture works best: encoder 64-32-16, decoder mirrored. No extra tricks.',
        'Dynamic masking hurt: the fixed 0.4 mask rate outperformed adaptive schemes.',
        'The baseline was already optimal: hybrid variants seeded with MAE features did not beat the original.',
        'Classical methods stay consistent: KMeans and KNN show near-zero variance across folds.',
      ]},
    ],
    key: 'mae',
  },
  'Dashboard-Analisis-Universitas-LPDP': {
    slug: 'dashboard-analisis-universitas-lpdp',
    repo: 'https://github.com/Darelrk/Dashboard-Analisis-Universitas-LPDP',
    eyebrow: 'Analytics · Scraping · Dashboard',
    title: 'Finding hidden gems in the LPDP list.',
    intro: 'The LPDP scholarship publishes its destination-university list. This project scrapes QS, THE, and CWUR rankings for every university on it, merges them into one master dataset, and surfaces the hidden gems: places whose Computer Science program outranks their overall reputation.',
    stats: [
      { value: '158', unit: 'universities', label: 'from the official LPDP list' },
      { value: '4', unit: 'rankings', label: 'QS 2026, THE 2025, CWUR 2025, THE CS 2025' },
      { value: '230', unit: 'spots', label: 'largest gap: CS rank vs overall rank' },
    ],
    blocks: [
      { type: 'gem-list', title: 'Hidden gems, largest CS-vs-overall gap', note: 'QS overall rank compared with THE Computer Science rank. Positive delta means the CS program is better known among CS academics than the university is overall.' },
      { type: 'method-steps', steps: [
        { n: '01', t: 'Collect', d: 'Selenium scrapes QS, THE, and CWUR, using the LPDP list as the reference set.' },
        { n: '02', t: 'Merge', d: 'Pandas cleans and joins all sources into one master CSV.' },
        { n: '03', t: 'Score', d: 'Hidden Gem Score ranks CS strength against overall reputation.' },
        { n: '04', t: 'Publish', d: 'Looker Studio dashboard with map, ranking comparison, and country filters.' },
      ]},
    ],
    key: 'lpdp',
  },
  'Sleep-Health-and-Lifestyle-Dataset': {
    slug: 'sleep-health-and-lifestyle-dataset',
    repo: 'https://github.com/Darelrk/Sleep-Health-and-Lifestyle-Dataset',
    eyebrow: 'EDA · Health · Visualization',
    title: 'What the sleep data actually says.',
    intro: 'An end-to-end exploratory analysis of the Sleep Health and Lifestyle dataset: cleaning, feature engineering (splitting blood pressure into systolic and diastolic), and five findings that survive scrutiny, published as an interactive Looker Studio dashboard.',
    stats: [
      { value: '5', unit: 'findings', label: 'verified insights from the analysis' },
      { value: '2', unit: 'features', label: 'engineered: systolic, diastolic' },
      { value: '1', unit: 'dashboard', label: 'interactive, filterable, published' },
    ],
    blocks: [
      { type: 'insight-list', title: 'Key insights', note: 'Every claim below is checked against the cleaned dataset; the stratified-resampling copy was used for visuals only, never for inference.' },
      { type: 'method-steps', steps: [
        { n: '01', t: 'Clean', d: 'Duplicates dropped, BMI categories standardized (Normal to Normal Weight).' },
        { n: '02', t: 'Engineer', d: 'Blood pressure "126/83" split into two numeric columns.' },
        { n: '03', t: 'Analyze', d: 'Correlations between stress, BMI, activity, and sleep outcomes.' },
        { n: '04', t: 'Visualize', d: 'Looker Studio dashboard with KPIs and interactive filters.' },
      ]},
    ],
    key: 'sleep',
  },
}
