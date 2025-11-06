
import type { SyllabusModule, ModuleName, Language } from '../types';

const respiratorySystemData: SyllabusModule = {
  "module_title": "Respiratory System",
  "language": "en",
  "outcomes": [
    "Describe the clinical features, correlate them with pathophysiology, arrive at a logical diagnosis and outline principles of management of common respiratory diseases.",
    "Interpret x-ray chest and sputum reports with reference to common respiratory diseases.",
    "Manage common respiratory emergencies encountered during oro-dental procedures."
  ],
  "explain": [
    {
      "topic": "Pneumonia",
      "summary_html": "<h4>Pathophysiology</h4><p>Inflammation of the lung parenchyma caused by infection (bacterial, viral, fungal). This leads to consolidation of the alveolar spaces, impairing gas exchange.</p><h4>Clinical Features</h4><p>Fever, chills, productive cough (rust-colored or purulent sputum), pleuritic chest pain, dyspnoea. On examination: bronchial breath sounds, crackles, dullness to percussion over the affected area.</p><h4>Differential Diagnosis</h4><p>Pulmonary oedema, pulmonary embolism, lung abscess, TB.</p><h4>Investigations</h4><p>Chest X-ray (shows consolidation/infiltrates), Sputum gram stain & culture, Complete Blood Count (leukocytosis).</p><h4>Principles of Management</h4><p>Antibiotics (empirical then targeted), supportive care (oxygen, fluids, analgesia), physiotherapy.</p><h4>Referrals/Red Flags</h4><p>Hypoxia (SaO2 <92%), hypotension, confusion, severe tachypnoea. These patients require urgent hospital admission.</p>"
    },
    {
      "topic": "Chronic Obstructive Pulmonary Disease (COPD)",
      "summary_html": "<h4>Pathophysiology</h4><p>A progressive lung disease characterized by persistent airflow limitation. It's an inflammatory response to noxious particles (primarily smoking), encompassing chronic bronchitis and emphysema.</p><h4>Clinical Features</h4><p>Chronic productive cough, progressive dyspnoea, wheezing. 'Pink puffers' (emphysema-dominant) and 'blue bloaters' (bronchitis-dominant). Barrel chest, use of accessory muscles.</p><h4>Differential Diagnosis</h4><p>Asthma, heart failure, bronchiectasis.</p><h4>Investigations</h4><p>Spirometry (FEV1/FVC ratio < 0.7 is diagnostic), Chest X-ray (hyperinflation, flattened diaphragms).</p><h4>Principles of Management</h4><p>Smoking cessation is key. Bronchodilators (short and long-acting), inhaled corticosteroids, pulmonary rehabilitation, oxygen therapy for chronic hypoxemia.</p><h4>Referrals/Red Flags</h4><p>Acute exacerbation with increased dyspnoea, sputum volume/purulence. Worsening hypoxemia or new hypercapnia.</p>"
    },
    {
      "topic": "Pulmonary Tuberculosis",
      "summary_html": "<h4>Pathophysiology</h4><p>Infection caused by Mycobacterium tuberculosis, typically affecting the lungs. Characterized by granuloma formation (tubercles) which can lead to caseous necrosis and cavitation.</p><h4>Clinical Features</h4><p>Chronic cough (>2 weeks), fever, night sweats, weight loss, haemoptysis. Can be asymptomatic initially.</p><h4>Differential Diagnosis</h4><p>Pneumonia, lung cancer, lung abscess, fungal infections.</p><h4>Investigations</h4><p>Sputum for Acid-Fast Bacilli (AFB) smear and culture/GeneXpert, Chest X-ray (typically shows upper lobe infiltrates, cavitation).</p><h4>Principles of Management</h4><p>Multi-drug anti-tubercular therapy (e.g., RIPE regimen: Rifampicin, Isoniazid, Pyrazinamide, Ethambutol) for at least 6 months under a directly observed therapy (DOTS) program.</p><h4>Referrals/Red Flags</h4><p>All suspected cases must be referred to a national TB program center. Massive haemoptysis, respiratory failure are emergencies.</p>"
    },
     {
      "topic": "Bronchial Asthma",
      "summary_html": "<h4>Pathophysiology</h4><p>A chronic inflammatory disorder of the airways characterized by reversible airflow obstruction and bronchial hyperresponsiveness. Triggered by allergens, infections, or irritants.</p><h4>Clinical Features</h4><p>Episodic wheezing, shortness of breath, chest tightness, and cough, particularly at night or early morning. Symptoms are often relieved by bronchodilators.</p><h4>Differential Diagnosis</h4><p>COPD, vocal cord dysfunction, foreign body aspiration, heart failure ('cardiac asthma').</p><h4>Investigations</h4><p>Spirometry (showing reversible obstruction post-bronchodilator), Peak Expiratory Flow (PEF) monitoring.</p><h4>Principles of Management</h4><p>Controller medications (inhaled corticosteroids) and reliever medications (short-acting beta-agonists). Patient education on trigger avoidance and action plans is crucial.</p><h4>Referrals/Red Flags</h4><p>Acute severe asthma (inability to speak full sentences, PEF <50% predicted, silent chest) is a medical emergency requiring immediate hospital transfer.</p>"
    },
     {
      "topic": "Lung Cancer",
      "summary_html": "<h4>Pathophysiology</h4><p>Malignant tumor arising from the respiratory epithelium. Broadly classified into Small Cell Lung Cancer (SCLC) and Non-Small Cell Lung Cancer (NSCLC). Smoking is the number one risk factor.</p><h4>Clinical Features</h4><p>Persistent cough, haemoptysis, chest pain, weight loss, dyspnoea. May present with paraneoplastic syndromes or symptoms from metastases.</p><h4>Differential Diagnosis</h4><p>Tuberculosis, lung abscess, pneumonia, metastatic cancer from another primary.</p><h4>Investigations</h4><p>Chest X-ray, CT scan of chest, bronchoscopy with biopsy for definitive diagnosis and staging.</p><h4>Principles of Management</h4><p>Depends on type and stage. Includes surgery, chemotherapy, radiation therapy, targeted therapy, and immunotherapy. Palliative care is essential for advanced disease.</p><h4>Referrals/Red Flags</h4><p>Any suspicion of lung cancer, especially in a smoker with new respiratory symptoms, warrants urgent referral for investigation.</p>"
    }
  ],
  "algorithms": [
    {
      "name": "Approach to Acute Dyspnoea in a Dental Clinic",
      "ascii_flow": "Patient develops shortness of breath\n          |\n   [ STOP DENTAL PROCEDURE ]\n          |\n   Assess ABCDE (Airway, Breathing, Circulation, Disability, Exposure)\n          |\nIs patient UNSTABLE (unconscious, cyanosed, severe distress)?\n   |                                  |\n [YES] --------------------------- [NO]\n   |                                  |\nCall for emergency medical help    Sit patient upright\nAdminister high-flow oxygen        Loosen tight clothing\nPrepare for CPR if needed          Take focused history (Asthma? Heart problem?)\n                                    |\n                         +----------+----------+\n                         |          |          |\n                      [Wheeze]   [Chest Pain]  [Normal Exam]\n                         |          |          |\n                 Asthma/COPD ->   Angina/MI ->  Anxiety/Syncope\n             Administer own     Administer GTN    Reassure\n             inhaler, O2        if available, O2\n                         |\n            [ MONITOR VITALS CONTINUOUSLY ]\n                         |\n        [ If no improvement or worsening, call for emergency help ]"
    }
  ],
  "cases": [
    {
      "title": "Case 1: Elderly Smoker with Fever",
      "stem": "A 68-year-old male, a chronic smoker, presents with a 4-day history of high-grade fever, chills, and a cough producing rusty-brown sputum. He complains of sharp pain in his right chest that worsens on deep breathing. On examination, his respiratory rate is 28/min, temperature is 39°C, and he has crackles and bronchial breath sounds in the right lower lung zone.",
      "questions": [
        "What is the most likely diagnosis?",
        "What physical finding would you expect on percussion of the right lower chest?",
        "Which investigation is most crucial for confirming the diagnosis?",
        "Outline the principles of his management."
      ],
      "teaching_points": [
        "The constellation of acute fever, productive cough (classic rusty sputum), and pleuritic chest pain in an elderly smoker strongly suggests Community-Acquired Pneumonia.",
        "Percussion over the consolidated lung area would reveal dullness.",
        "A Chest X-ray is essential to confirm the presence and location of consolidation.",
        "Management principles include empirical antibiotics (e.g., covering Streptococcus pneumoniae), oxygen supplementation if hypoxic, adequate hydration, and analgesia for the pleuritic pain."
      ]
    },
    {
      "title": "Case 2: Young Adult with Chronic Cough",
      "stem": "A 24-year-old university student from a rural area in Nepal presents with a cough for the past 2 months, low-grade evening fevers, significant weight loss, and occasional night sweats. He has a poor appetite. His friend who he shares a room with was recently treated for a 'long lung illness'.",
      "questions": [
        "What is the primary differential diagnosis you must consider?",
        "What specific investigations should be prioritized?",
        "What public health principle is critical in managing this condition?",
        "Why is it important to ask about his roommate's illness?"
      ],
      "teaching_points": [
        "The triad of chronic cough, fever, and weight loss, especially with a history of contact, is highly suggestive of Pulmonary Tuberculosis until proven otherwise.",
        "Prioritized investigations are sputum for AFB smear and GeneXpert/culture, and a Chest X-ray (looking for apical changes/cavitation).",
        "Directly Observed Therapy, Short-course (DOTS) is a key public health strategy to ensure treatment adherence and prevent drug resistance.",
        "The contact history is a major epidemiological clue, increasing the pre-test probability of TB and highlighting the infectious nature of the disease."
      ]
    }
  ],
  "image_drills": [
    {
      "type": "CXR",
      "prompt": "You are shown a PA chest X-ray of a patient presenting with dyspnoea. You observe a dense, homogeneous opacity in the right lower zone that obscures the right hemidiaphragm and the right heart border. There is blunting of the right costophrenic angle and a concave upper border (meniscus sign). What are the key findings and the most likely diagnosis?",
      "model_answer": "Key Findings: The image shows a right-sided opacity with obscuration of the diaphragm (silhouette sign), blunting of the costophrenic angle, and a meniscus sign. \nDiagnosis: These are classical radiological features of a right-sided pleural effusion."
    },
    {
      "type": "CXR",
      "prompt": "A chest X-ray of a tall, thin young man who presented with sudden onset left-sided chest pain shows a visible visceral pleural edge which is separated from the chest wall. The lung markings are absent peripheral to this line. The trachea appears central. What is the diagnosis?",
      "model_answer": "Diagnosis: The findings describe a left-sided simple pneumothorax. The key signs are the visible pleural line and absence of lung markings in the periphery. The central trachea indicates it is not a tension pneumothorax at this stage."
    }
  ],
  "dental_emergency_cards": [
    {
      "condition": "Acute Asthma Exacerbation",
      "first_aid_steps": [
        "IMMEDIATELY stop the dental procedure.",
        "Sit the patient upright, leaning slightly forward to ease breathing.",
        "Administer the patient's own reliever inhaler (e.g., salbutamol), typically 2-4 puffs via a spacer if available.",
        "Provide reassurance.",
        "Administer supplemental oxygen if available and the patient is hypoxic."
      ],
      "refer_when": [
        "Patient shows no improvement after initial treatment.",
        "Patient is unable to speak in full sentences.",
        "Patient becomes drowsy, confused, or exhausted.",
        "Patient's condition worsens (increasing respiratory rate, cyanosis)."
      ]
    },
    {
      "condition": "Foreign Body Aspiration",
      "first_aid_steps": [
        "If patient is coughing forcefully, encourage them to continue coughing.",
        "If patient has a weak cough, is unable to speak, or shows signs of severe distress (cyanosis, clutching throat):",
        "Stand behind the patient and deliver up to 5 sharp back blows between the shoulder blades.",
        "If unsuccessful, perform up to 5 abdominal thrusts (Heimlich maneuver).",
        "Alternate between 5 back blows and 5 abdominal thrusts."
      ],
      "refer_when": [
        "IMMEDIATELY call for emergency medical help if the obstruction is not cleared.",
        "Even if the object is dislodged, the patient should be medically evaluated for potential injury or residual fragments."
      ]
    }
  ],
  "osce": {
    "stations": [
      {
        "name": "Respiratory System Examination",
        "checklist": [
          "Washes hands, introduces self, gains consent, and positions patient appropriately (45 degrees).",
          "General Inspection: Checks for cyanosis, use of accessory muscles, respiratory rate, and chest shape.",
          "Hands: Checks for clubbing, tar staining, and peripheral cyanosis.",
          "Face & Neck: Checks for central cyanosis, inspects JVP, palpates for tracheal deviation and cervical lymph nodes.",
          "Inspection of Chest (Anterior & Posterior): Notes scars, deformities, and symmetry of movement.",
          "Palpation: Assesses chest expansion (anteriorly and posteriorly) and vocal fremitus.",
          "Percussion: Percusses all lung zones symmetrically, comparing left to right (including apices and axillae).",
          "Auscultation: Listens to all lung zones with the diaphragm of the stethoscope, asking the patient to breathe deeply through their mouth. Listens for breath sounds, added sounds (wheezes, crackles), and vocal resonance.",
          "Completes examination by checking for sacral oedema and ankle oedema.",
          "Summarizes findings and offers a differential diagnosis."
        ],
        "marks": {
          "history": 0,
          "exam": 15,
          "reasoning": 5,
          "total": 20
        }
      }
    ],
    "global_rating": ["Unsatisfactory", "Borderline", "Meets Expectations", "Exceeds Expectations"]
  },
  "quiz_mcq": [
    {
      "q": "Which of the following is the most definitive investigation for diagnosing COPD?",
      "options": ["Chest X-ray", "Arterial Blood Gas", "Spirometry", "Sputum Culture"],
      "answer_index": 2,
      "why": "Spirometry is the gold standard for diagnosing COPD. A post-bronchodilator FEV1/FVC ratio of less than 0.7 confirms persistent airflow limitation."
    },
    {
      "q": "A 'stony dull' percussion note on the chest is a classic sign of:",
      "options": ["Pneumothorax", "Pleural Effusion", "Lobar Pneumonia", "Asthma"],
      "answer_index": 1,
      "why": "Fluid in the pleural space (pleural effusion) does not transmit sound waves well, leading to a 'stony dull' note on percussion. In contrast, pneumothorax is hyper-resonant."
    },
    {
      "q": "Which of the following symptoms is a constitutional 'B' symptom highly suggestive of Pulmonary Tuberculosis?",
      "options": ["Productive cough", "Pleuritic chest pain", "Night sweats", "Haemoptysis"],
      "answer_index": 2,
      "why": "Night sweats, along with fever and weight loss, are classic constitutional symptoms ('B' symptoms) associated with Tuberculosis and other conditions like lymphoma."
    },
    {
      "q": "In a patient having a severe acute asthma attack in a dental chair, what is the MOST important initial step?",
      "options": ["Administer oxygen", "Stop the dental procedure", "Call for an ambulance", "Administer their salbutamol inhaler"],
      "answer_index": 1,
      "why": "The absolute first step is to stop the precipitating event, which is the dental procedure. All other steps follow immediately after."
    },
    {
      "q": "Cavitation on a chest X-ray is most commonly associated with which condition?",
      "options": ["Pleural Effusion", "Pulmonary Tuberculosis", "Bronchial Asthma", "COPD"],
      "answer_index": 1,
      "why": "Post-primary (reactivation) tuberculosis often leads to caseous necrosis and the formation of cavities, typically in the lung apices."
    },
    {
      "q": "The 'silhouette sign' on a chest X-ray is useful for:",
      "options": ["Detecting small pneumothoraces", "Localizing an area of consolidation", "Diagnosing pulmonary embolism", "Measuring heart size"],
      "answer_index": 1,
      "why": "The silhouette sign helps localize an opacity. If an opacity obscures a border (like the heart border or diaphragm), it must be in anatomical contact with it (e.g., right middle lobe pneumonia obscures the right heart border)."
    },
    {
      "q": "A patient with bronchiectasis typically presents with:",
      "options": ["Dry, hacking cough", "Sudden onset dyspnoea", "Chronic cough with large volumes of purulent sputum", "Intermittent wheeze"],
      "answer_index": 2,
      "why": "Bronchiectasis is the permanent dilation of airways, leading to impaired mucus clearance and chronic infection. This results in a classic presentation of daily, large-volume, purulent sputum production."
    },
    {
      "q": "A tension pneumothorax is a medical emergency because it directly causes:",
      "options": ["Severe infection", "Massive haemoptysis", "Cardiovascular collapse", "Bronchospasm"],
      "answer_index": 2,
      "why": "In a tension pneumothorax, rising intrathoracic pressure compresses the great veins and heart, impeding venous return and leading to obstructive shock and cardiovascular collapse."
    },
    {
      "q": "Which is a common feature of emphysema-dominant COPD seen on a chest X-ray?",
      "options": ["Pleural thickening", "Multiple nodules", "Flattened hemidiaphragms", "A large cardiac silhouette"],
      "answer_index": 2,
      "why": "Emphysema leads to lung hyperinflation. This is seen on a CXR as flattened hemidiaphragms, an increased retrosternal air space, and a narrow 'saber-sheath' trachea."
    },
    {
      "q": "The primary goal of using a 'reliever' inhaler in asthma is to:",
      "options": ["Reduce airway inflammation", "Provide rapid bronchodilation", "Prevent nocturnal symptoms", "Improve mucus clearance"],
      "answer_index": 1,
      "why": "Relievers (like salbutamol, a short-acting beta-agonist) act quickly to relax airway smooth muscle, providing rapid relief from bronchoconstriction during an asthma attack."
    },
    {
      "q": "In which lung zone does primary tuberculosis infection typically manifest?",
      "options": ["Apices", "Mid-zones", "Bases", "Hilar region"],
      "answer_index": 3,
      "why": "Primary TB infection usually involves the mid or lower lung zones with associated hilar lymphadenopathy, forming the 'Ghon complex'. Reactivation TB characteristically affects the apices."
    },
    {
      "q": "What is respiratory failure?",
      "options": ["Inability to speak", "A respiratory rate above 30/min", "Inadequate gas exchange by the respiratory system", "The need for mechanical ventilation"],
      "answer_index": 2,
      "why": "Respiratory failure is defined by the inability of the respiratory system to maintain adequate gas exchange, leading to hypoxia (Type I) or hypoxia with hypercapnia (Type II)."
    }
  ],
  "quiz_short": [
    {
      "q": "List four key principles in the management of an acute exacerbation of COPD.",
      "expected_points": [
        "Controlled oxygen therapy (to avoid worsening hypercapnia).",
        "Bronchodilators (e.g., nebulized salbutamol/ipratropium).",
        "Systemic corticosteroids (e.g., oral prednisolone).",
        "Antibiotics (if there is evidence of infection)."
      ],
      "marks": 4
    },
    {
      "q": "What are three clinical signs that differentiate a tension pneumothorax from a simple pneumothorax?",
      "expected_points": [
        "Tracheal deviation (away from the affected side in tension).",
        "Hypotension / signs of shock (present in tension).",
        "Distended neck veins (present in tension due to impaired venous return)."
      ],
      "marks": 3
    },
    {
      "q": "Name the four first-line drugs used in the intensive phase of treatment for pulmonary tuberculosis (RIPE regimen).",
      "expected_points": [
        "Rifampicin",
        "Isoniazid",
        "Pyrazinamide",
        "Ethambutol"
      ],
      "marks": 4
    },
    {
      "q": "Describe the pathophysiology of bronchiectasis in two sentences.",
      "expected_points": [
        "It involves irreversible, abnormal dilation of the bronchi and bronchioles.",
        "This structural damage impairs the mucociliary escalator, leading to chronic infection, inflammation, and further airway damage in a vicious cycle."
      ],
      "marks": 2
    }
  ],
  "reflection": [
    "Reflect on the challenges of managing a patient with tuberculosis in a resource-limited setting in Nepal. Consider issues of diagnosis, treatment adherence, and social stigma.",
    "A long-term smoker is diagnosed with inoperable lung cancer. How would you approach breaking this news, demonstrating empathy and a humane attitude?",
    "You are in a rural health post with limited supplies. A patient presents with acute severe asthma. How do you adapt your management principles to this situation?"
  ],
  "references_note": "Summaries based on the provided course outline; educational only. This app cannot give medical advice. Please consult a licensed clinician for patient care.",
  "version": "1.0"
};

/**
 * Simulates a call to the Gemini API to generate structured educational content.
 * In a real application, this would construct a prompt and call the Gemini API.
 * The new chatbot feature makes live calls to the Gemini API, while this function
 * currently uses mock data for demonstration.
 * 
 * @param moduleName The name of the module to generate content for.
 * @param language The desired language.
 * @returns A promise that resolves to the structured syllabus module.
 */
export const generateModuleContent = async (
  moduleName: ModuleName,
  language: Language
): Promise<SyllabusModule> => {
  console.log(`Fetching content for: ${moduleName} in ${language}`);

  // Mocked response for demonstration
  await new Promise(res => setTimeout(res, 500)); 

  if (moduleName === 'Respiratory System') {
    return respiratorySystemData;
  }
  
  // Return a boilerplate for other modules
  return {
    module_title: `${moduleName}`,
    language: language,
    outcomes: [`Content for ${moduleName} is not yet available.`],
    explain: [],
    algorithms: [],
    cases: [],
    image_drills: [],
    dental_emergency_cards: [],
    osce: { stations: [], global_rating: [] },
    quiz_mcq: [],
    quiz_short: [],
    reflection: [],
    references_note: "Content generation is pending.",
    version: "1.0"
  };
};
