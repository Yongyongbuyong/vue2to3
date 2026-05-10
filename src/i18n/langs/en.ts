export default {
  commen: {
    example1: 'hahahhahaha',
    example2: 'xixixixixi'
  },
  noti: {
    title: 'Notice',
    message: 'Please read the user instructions first and check the box',
    copy: 'You have successfully copied'
  },
  button: {
    confirm: 'confirm',
    cancel: 'cancel',
    reset: 'reset',
    submit: 'submit'
  },
  general_info: {
    gender: 'Gender: ',
    male: 'Male',
    female: 'Female',
    age: 'Age: ',
    phone_number: 'Number: '
  },
  home: {
    title: 'Intelligent cervical spondylosis auxiliary diagnosis tool',
    description:
      'A team from the School of Software at South China University of Technology has developed an intelligent auxiliary diagnosis tool for cervical spondylosis. Through hand key point positioning and multi-modal hand grasping motion analysis, it comprehensively evaluates cervical spine function and provides a reference for auxiliary diagnosis of cervical spondylosis.',
    btn_normal: 'I am not a hospitalized patient',
    btn_hospital: 'I am a hospitalized patient',
    text_read: 'I have read and agree',
    note: '<User Guide>',
    version: '2.0',
    tips:
      'Before using this program, please carefully read (minors should read with their guardians) and fully understand the terms in this "User Notice". Checking "I have read and agreed to the User Notice" and using this program will represent that you agree to the contents of this User Notice. Unless you read and agree to the contents of this User Notice, you have no right to use this program. \n' +
      '1. This program is developed by the School of Software of South China University of Technology. All copyrights and other intellectual property rights of this program, as well as all information content related to the program, including but not limited to: text expressions and their combinations, icons, decorations, charts, colors, interface design, layout framework, relevant data, printed materials, or electronic documents, are owned by the School of Software of South China University of Technology and are protected by copyright law and international copyright treaties and other intellectual property laws and regulations. \n' +
      '2. This program is only used to roughly evaluate hand function and to roughly judge the risk of cervical spondylosis in the tester. The results of the evaluation are for reference only and cannot be used as a basis for diagnosis or clinical diagnosis and treatment. Users should go to the hospital for further consultation. \n' +
      '3. The images and analysis data uploaded through this program are only for disease screening and clinical research purposes and shall not be used for other purposes. The School of Software of South China University of Technology respects and protects the personal privacy of all users and will not actively disclose it to any third party. \n' +
      '4. Users shall not use this program to publish, transmit, disseminate, or store content that violates national laws, endangers national security, national unity, and social stability, or any inappropriate, insulting, defamatory, obscene, violent, or any content that violates national laws, regulations, and policies. This program shall not be used to publish, transmit, disseminate, or store content that infringes on the intellectual property rights, trade secrets, and other legal rights of others. This program shall not be used to mislead or deceive others. \n' +
      "5. The consequences of using this program are at the user's own risk. The School of Software of South China University of Technology does not make any type of guarantee for the consequences of using this program, including but not limited to the results of diagnostic assessment, disease assessment, hand activity assessment, and any effects thereof. \n" +
      '6. All rights of interpretation and modification of this "User Notice" belong to the School of Software of South China University of Technology.'
  },
  info_page: {
    normal_title: 'Basic information entry for non-hospitalized patients',
    patient_title: 'Basic information entry for inpatients',
    description: 'Developed by School of Software, SCUT',
    coopration: '',
    name: 'Name:',
    name_text: 'Please enter your name',
    gender: 'Gender: ',
    male: 'male',
    female: 'female',
    age: 'Age: ',
    phone_number: 'Number: ',
    age_text: 'Please enter your age (mandatory)',
    phone_number_text: 'Please enter a contact phone number (mandatory)',
    Hospital_id: 'Hospital Name:',
    Hospital_text: 'Please enter your hospital name (mandatory)',
    patient_id: 'Patient ID:',
    patient_text: 'Please enter your patient ID (mandatory)',
    other: 'Category:',
    no_text: 'No',
    术后随访: 'Postoperative follow-up',
    筛查: 'Preoperative diagnosis',
    note: 'Note: The above information is very important for an accurate assessment of hand function in cervical spine, so please make sure you fill it out accurately.',
    iswith:
      'Fields with an * indicate required information, while fields without an * indicate optional information',
    start: 'Start recording video',
    ageError: 'Age cannot be empty',
    inputNum: 'Please input number',
    notSuper99: 'Not more than 99 years old',
    inputRightPhone: 'Please enter the correct mobile phone number',
    none: 'None',
    chooseSex: 'Please select sex',
    inputAge: 'Please enter your age',
    inputHospitalId: 'Please enter the name of the hospital',
    inputPatientId: 'Please enter the patient ID',
    numberLength: 'Length between 8 and 11 characters',
    choosePatientType: 'Please select patient type',
    confirmInfoRight: 'Is the information correct?',
    yes: 'Yes',
    checkAgain: 'Check again',
    tip: 'Prompt',
    inputPhone: 'Please input phone number',
    inputName: 'Please input name'
  },
  tutorial_page: {
    title: 'Hand grasping video recording and questionnaire information entry',
    prompt_left: 'Recording tutorial is very important, so be sure to watch it carefully!',
    prompt_right1: 'Please complete the following steps in order.',
    prompt_right2: 'Then click on the [Start Testing] button.',
    prompt_right3: 'The test time is about 1-2 minutes.',
    prompt_right4: 'Please wait patiently!',
    btn1: 'Record left-handed videos.',
    btn2: 'Record right-handed videos.',
    btn3: 'Questionnaire Information.',
    btn4: 'Start testing.',
    finishAll: 'Please complete all steps first.'
  },
  mJOA_page: {
    title: 'mJOA Score ',
    Q_upper: 'Motor dysfunction score of the upper extremities:',
    Q_lower: ' Motor dysfunction score of the lower extremities:',
    Q_sensation: 'Sensation:',
    Q_sphincter: 'Sphincter dysfunction: ',
    A_upper_1: 'No dysfunction',
    A_upper_2: 'Able to button shirt with slight difficulty',
    A_upper_3: 'Able to button shirt with great difficulty',
    A_upper_4: 'Inability to button shirt but able to eat with a spoon',
    A_upper_5: 'Inability to eat with a spoon but able to move hands',
    A_upper_6: 'Inability to move hands',
    A_lower_1: 'No dysfunction',
    A_lower_2: 'Mild lack of stability but walk unaided with smooth reciprocation',
    A_lower_3:
      'Moderate to significant lack of stability but able to walk up and/or down stairs withouthand rail',
    A_lower_4: 'Able to walk up and/or down stairs with hand rail',
    A_lower_5: 'Able to walk on flat floor with a walking aid (i.e., cane or crutch)',
    A_lower_6: 'Able to move legs but unable to walk',
    A_lower_7: 'Sensory preservation without ability to move legs',
    A_lower_8: 'Complete loss of motor and sensory function',
    A_sensation_1: 'No dysfunction',
    A_sensation_2: 'Mild sensory loss',
    A_sensation_3: 'Severe sensory loss or pain',
    A_sensation_4: 'Complete ioss of hand sensation',
    A_sphincter_1: 'Normal micturition',
    A_sphincter_2: 'Mild to moderate difficulty with micturition',
    A_sphincter_3: 'Marked difficulty with micturition',
    A_sphincter_4: 'Inability to urinate voluntarily',
    btn_submit: '提交'
  },
  camera_page: {
    title: 'Video Recording',
    prompt1: 'Please record or upload a 10-second video of hand grip.',
    btn_upload_live: 'Upload the video just recorded',
    btn_upload_file: 'Upload video file',
    description1: 'Please upload the video of your left hand',
    description2: 'Please upload the video of your right hand',
    prompt: 'Prompt',
    confirm: 'Confirm',
    warningPart1: 'The current limit is to select 1 file. This time, ',
    warningPart2: ' file has been selected, and a total of ',
    warningPart3: ' files have been selected'
  },
  thanks_page: {
    title: 'Thanks for your submission!',
    description1: 'The detection time is approximately 1-2 minutes.',
    description2: 'The specific time is subject to the influence of network conditions.',
    description3: 'Please be patient and wait.',
    btn_res: 'View results'
  },
  result_page: {
    Hnumber: 'Hospital number: ',
    id: 'ID:',
    gender: 'Gender:',
    age: 'Age: ',
    times: 'Number of 10-second grip-and-release cycles:',
    avg_time: 'Average grip time:',
    max_speed: 'Maximum grip speed',
    min_speed: 'Minimum grip speed',
    变异系数: 'Variation coefficient:',
    补充信息评分: 'Questionnaire Rating:',
    检测结论: 'Auxiliary diagnosis conclusion: ',
    left_hand: 'Left hand:',
    right_hand: 'Right hand:',
    second: 'seconds',
    times1: 'times',
    // 补充信息: MJOA评分为
    info: 'The mJOA score is ',
    title: 'Intelligent cervical spondylosis auxiliary diagnosis results',
    video_text: 'Key hand positioning:',
    failure_text:
      'There was a problem during your detection process. Please keep the network open, relax your fingers, take a deep breath, and click the Redetect button below to try again.',
    btn_re: 'Re-detection',
    btn_home: 'Testing completed',
    btn_copy: 'Copy the result',
    note_title: 'Notes:',
    note_text:
      'The results are for reference only and are not intended for formal diagnosis. The results of the 10-second grip test are based on Liang et al., Spine 2024; Ye et al., Neurospine 2024; Machino. Clin Neurol Neurosurg. 2019; Yukawa. J Orthop Sci. 2013',
    result_half1:
      'Based on the results of the ten-second grip-and-release test, your manual dexterity rating is predicted to be ',
    result_half2: '. Based on these results, it is recommended that you ',
    Screenshot:
      'Please take a screenshot of this page and save it for your reference when seeking medical advice.',
    btn_ref: 'Reference',
    句号: '.',
    result_page_level: {
      // level1: "优秀",
      // level2: "良好",
      // level3: "中等",
      // level4: "较差",
      // 对应的英文翻译
      level1: 'Excellent',
      level2: 'Good',
      level3: 'Fair',
      level4: 'Poor'
    },
    graph_title: 'Grip Speed Analysis Chart (Unit: GPM)',
    note: 'The results are for reference only and are not intended for formal diagnosis. The results of the 10-second grip test are based on Liang et al., Spine 2024; Ye et al., Neurospine 2024; Machino. Clin Neurol Neurosurg. 2019; Yukawa. J Orthop Sci. 2013'
  }
}
