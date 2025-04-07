export const translations = {
  en: {
    navLogo: "Bus University Control",
    nav: {
      about: "About",
      services: "Services",
      contact: "Contact"
    },
    home: {
      slides: {
        welcome: "Welcome to University of Biskra",
        transport: "Modern Campus Transportation",
        connect: "Connecting Campus Life"
      },
      hero: {
        title: "University Of Biskra Bus Transportation service",
        subtitle: "Connecting students across campus with reliable and efficient transportation"
      },
      about: {
        title: "About Our Service",
        mission: "Our Mission",
        description: "Providing reliable, safe, and efficient transportation services to connect our university community.",
        routes: "Extensive Routes",
        routesDesc: "Multiple routes covering all major campus locations and student residential areas.",
        students: "Student-Focused",
        studentsDesc: "Designed to meet student schedules and needs, ensuring easy access to educational facilities."
      },
      services: {
        title: "Our Services",
        fleet: "Modern Fleet",
        fleetDesc: "Our fleet of modern buses ensures comfortable and safe transportation for all students.",
        schedule: "Regular Schedule",
        scheduleDesc: "Frequent and reliable bus service throughout the academic day and evening hours."
      },
      contact: {
        title: "Contact Information",
        office: "Transportation Office",
        email: "Email",
        location: "Location",
        address: "University of Biskra, Algeria"
      },
      footer: {
        about: "University of Biskra",
        description: "Providing quality education and transportation services",
        quickLinks: "Quick Links",
        contact: "Contact Info",
        copyright: "University of Biskra. All rights reserved."
      }
    },
    admin: {
      sidebar: {
        title: "Bus Control",
        home: "Home",
        universitySection: "University Section",
        routes: "Routes",
        buses: "Buses",
        stations: "Stations",
        statistics: "Statistics",
        language: "Language",
        logout: "Logout"
      },
      validationErrors: {
        stationName: 'Please set the name of the station',
        NUMERO_BUS: 'Please put a valid bus number',
        nomChauffeur: 'Please put a valid driver name',
        telephoneChauffeur: 'Please put a valid phone number that starts with 05|06|07 and contains 10 digits',
        universitySection: 'Please select the university section!',
        mainStation: 'Please select the main station',
        internalStations: 'Please set at least one internal station',
        buses: 'Please select a bus for this route',
        goSchedules: 'Please select a go schedule for this route',
        backSchedules: 'Please select a back schedule for this route'
      },
      language: {
        en: 'English',
        fr: 'French',
        ar: 'Arabic'
      },
      alerts: {
        success: 'Success',
        error: 'Error',
        warning: 'Warning',
        info: 'Information',
        saved: 'Changes saved successfully',
        deleted: 'Item deleted successfully',
        updated: 'Item updated successfully',
        created: 'Item created successfully',
        operationFailed: 'Operation failed',
      },
      forms: {
        save: 'Save',
        cancel: 'Cancel',
        edit: 'Edit',
        delete: 'Delete',
        create: 'Create',
        search: 'Search',
        filter: 'Filter',
        select: 'Select'
      },
      errors: {
        loadingData:'Loading Data...',
        error:'No Data available because of a server error or a connection error',
       },
       univSection: { 
        addUnivSection:"add university section",
        searchUniv:'search university',
        confirmAdd: 'Are you sure you want to add this university?',
        confirmDelete: 'Are you sure you want to delete this university?',
        confirmation: 'Are you sure?',
        deleteNoticeText:{
         allInfo:'This will delete all its related information.',
         allRoutes:'This will delete all the routes of this university.',
         allBuses:'This will set all its buses to free and available to use.'
        }
       }
       ,
      buses: {
        confirm: 'Confirm',
        confirmation: 'Are you sure?',
        title: 'Bus Management',
        addBus: 'Add New Bus',
        editBus: 'Edit Bus',
        busNumber: 'Bus Number',
        driverName: 'Driver Name',
        driverPhone: 'Driver Phone',
        enter: {
          busNumber: 'Enter Bus Number',
          driverName: 'Enter Driver Name',
          driverPhone: 'Enter Driver Phone'
        },
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        actions: 'Actions',
        search: 'Search buses...',
        filterAll: 'All',
        filterAvailable: 'Available',
        filterUnavailable: 'Unavailable',
        confirmDelete: 'Bus will be deleted completely ,Do you really want to delete this Bus?',
        confirmEdit: 'Do you really want to edit this Bus?',
        confirmAdd: 'Do you really want to add a new Bus?',
        busExists: 'Bus number already exists',
        busExistsMessage: 'You can\'t use this bus number because it belongs to another bus',
        editSuccess: 'Bus was edited successfully',
        addSuccess: 'Bus was added successfully',
        deleteSuccess: 'Bus was deleted successfully',
        errorEditMessage: 'Error appeared during editing a Bus',
        errorAddMessage: 'Error appeared during adding a Bus',
        errorDeleteMessage: 'Error appeared during deleting the Bus'
      },
      statistics: {
        title: 'Statistics Dashboard',
        totalBuses: 'Total Buses',
        activeBuses: 'Active Buses',
        inactiveBuses: 'Inactive Buses',
        totalRoutes: 'Total Routes',
        totalStations: 'Total Stations',
        coveredStations: 'Covered Stations',
        uncoveredStations: 'Uncovered Stations'
      },
      routes: {
        mainStation: 'Main Station',
        selectStation: 'Select Station',
        universitySection: 'University Section',
        selectSection: 'Select Section',
        internalStations: 'Internal Stations',
        addStation: 'Add New Station',
        buses: 'Buses',
        selectBus: 'Select Bus',
        goSchedules: 'Go Schedules',
        backSchedules: 'Back Schedules',
        selectTime: 'Select Time',
        enterTime: 'Enter Time',
        title: 'Routes Management',
        search: 'Search routes...',
        addRoute: 'Add New Route',
        editRoute: 'Edit Route',
        routeNumber: 'Route Number',
        routeName: 'Route Name',
        startPoint: 'Start Point',
        endPoint: 'End Point',
        success: 'Success',
        successMsg: 'The operation was completed successfully',
        addSuccessMsg: 'The route has been added successfully',
        updateMsg: 'The data has been updated successfully',
        deleteMsg: 'The route has been deleted successfully',
        error: 'Error',
        errorMsg: 'An error occurred during the operation',
        errorNetwork: 'Operation failed : A network error occurred while connecting to the server',
        status: 'Status',
        confirm: 'Confirm',
        cancel: 'Cancel',
        active: 'Active',
        inactive: 'Inactive',
        actions: 'Actions',
        to: 'To',
        routeExists: 'This Route already exists',
        confirmation: 'Are you sure?',
        confirmDelete: 'Are you sure you want to delete this route?',
        confirmEdit: 'Are you sure you want to edit this route?',
        confirmAdd: 'Are you sure you want to add this route?',
        enter: {
          routeNumber: 'Enter Route Number',
          routeName: 'Enter Route Name',
          startPoint: 'Enter Start Point',
          endPoint: 'Enter End Point'
        },
        filterAll: 'All Routes',
        filterActive: 'Active Routes',
        filterInactive: 'Inactive Routes'
      },
      stations: {
        title: 'Stations Management',
        search: 'Search stations...',
        addStation: 'Add New Station',
        editStation: 'Edit Station',
        stationNumber: 'Station Number',
        stationName: 'Station Name',
        location: 'Location',
        status: 'Status',
        active: 'Active',
        inactive: 'Inactive',
        actions: 'Actions',
        confirmDelete: 'Are you sure you want to delete this station?',
        confirmEdit: 'Are you sure you want to edit this station name?',
        confirmAdd: 'Are you sure you want to add this station?',
        success: 'Success',
        successMsg: 'The operation was completed successfully',
        updateMsg: 'Data has been updated successfully',
        error: 'Error',
        errorMsg: 'An error occurred during the operation',
        errorNetwork: 'Operation failed : A network error occurred while connecting to the server',
        confirm: 'Confirm',
        cancel: 'Cancel',
        confirmation: 'Are you sure?',
        enter: {
          stationNumber: 'Enter Station Number',
          stationName: 'Enter Station Name',
          location: 'Enter Location'
        },
        filterAll: 'All Stations',
        filterActive: 'Active Stations',
        filterInactive: 'Inactive Stations'
      },
      home: {
        title: 'Dashboard',
        welcome: 'Welcome to Bus Management System',
        summary: 'System Overview',
        quickActions: 'Quick Actions',
        recentActivity: 'Recent Activity'
      }
    }
  },
  fr: {
    navLogo: "Contrôle des Bus Universitaires",
    nav: {
      about: "À propos",
      services: "Services",
      contact: "Contact"
    },
    home: {
      slides: {
        welcome: "Bienvenue à l'Université de Biskra",
        transport: "Transport Campus Moderne",
        connect: "Connecter la Vie du Campus"
      },
      hero: {
        title: "Service de Transport Universitaire de biskra",
        subtitle: "Connecter les étudiants à travers le campus avec un transport fiable et efficace"
      },
      about: {
        title: "À Propos de Notre Service",
        mission: "Notre Mission",
        description: "Fournir des services de transport fiables, sûrs et efficaces pour connecter notre communauté universitaire.",
        routes: "Routes Étendues",
        routesDesc: "Plusieurs itinéraires couvrant tous les principaux sites du campus et les zones résidentielles étudiantes.",
        students: "Axé sur les Étudiants",
        studentsDesc: "Conçu pour répondre aux horaires et aux besoins des étudiants, assurant un accès facile aux installations éducatives."
      },
      services: {
        title: "Nos Services",
        fleet: "Flotte Moderne",
        fleetDesc: "Notre flotte de bus modernes assure un transport confortable et sûr pour tous les étudiants.",
        schedule: "Horaire Régulier",
        scheduleDesc: "Service de bus fréquent et fiable tout au long de la journée académique et en soirée."
      },
      contact: {
        title: "Informations de Contact",
        office: "Bureau des Transports",
        email: "Email",
        location: "Emplacement",
        address: "Université de Biskra, Algérie"
      },
      footer: {
        about: "Université de Biskra",
        description: "Fournir des services d'éducation et de transport de qualité",
        quickLinks: "Liens Rapides",
        contact: "Coordonnées",
        copyright: "Université de Biskra. Tous droits réservés."
      }
    },
    admin: {
      sidebar: {
        title: "Contrôle Bus",
        home: "Accueil",
        universitySection: "Section Universitaire",
        routes: "Tragets",
        buses: "Bus",
        stations: "Stations",
        statistics: "Statistiques",
        language: "Langue",
        logout: "Déconnexion"
      },
      validationErrors: {
        stationName: 'Veuillez définir le nom de la station',
        NUMERO_BUS: 'Veuillez entrer un numéro de bus valide',
        nomChauffeur: 'Veuillez entrer un nom de chauffeur valide',
        telephoneChauffeur: 'Veuillez entrer un numéro de téléphone valide commençant par 05, 06 ou 07 et contenant 10 chiffres',
        universitySection: 'Veuillez sélectionner la section universitaire !',
        mainStation: 'Veuillez sélectionner la station principale',
        internalStations: 'Veuillez définir au moins une station interne',
        buses: 'Veuillez sélectionner un bus pour cet itinéraire',
        goSchedules: 'Veuillez sélectionner un horaire de départ pour cet itinéraire',
        backSchedules: 'Veuillez sélectionner un horaire de retour pour cet itinéraire'
      },
      language: {
        en: 'Anglais',
        fr: 'Français',
        ar: 'Arabe'
      },
      alerts: {
        success: 'Succès',
        error: 'Erreur',
        warning: 'Avertissement',
        info: 'Information',
        saved: 'Modifications enregistrées avec succès',
        deleted: 'Élément supprimé avec succès',
        updated: 'Élément mis à jour avec succès',
        created: 'Élément créé avec succès',
        operationFailed: 'Échec de l\'opération',
      },
      forms: {
        save: 'Enregistrer',
        cancel: 'Annuler',
        edit: 'Modifier',
        delete: 'Supprimer',
        create: 'Créer',
        search: 'Rechercher',
        filter: 'Filtrer',
        select: 'Sélectionner'
      },
      errors: {
        loadingData:'Chargement de données ...',
        error:"Aucune donnée disponible en raison d'une erreur de serveur ou de connection", 
      },
      univSection: { 
        addUnivSection:"ajouter une section universitaire",
        searchUniv:'rechercher une université',
        confirmAdd: 'Êtes-vous sûr de vouloir ajouter cette université?',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette université?',
        confirmation: 'Êtes-vous sûr ?',
        deleteNoticeText: {
          allInfo: 'Cela supprimera toutes les informations associées.',
          allRoutes: "Cela supprimera toutes les routes de cette université.",
          allBuses: "Cela rendra tous ses bus libres et disponibles à l'utilisation."
        }
        
      },
      buses: {
        confirm: 'Confirmer',
        confirmation: 'Êtes-vous sûr?',
        title: 'Gestion des Bus',
        addBus: 'Ajouter un Nouveau Bus',
        editBus: 'Modifier le Bus',
        busNumber: 'Numéro de Bus',
        driverName: 'Nom du Chauffeur',
        driverPhone: 'Téléphone du Chauffeur',
        enter: {
          busNumber: 'Entrer Numéro de Bus',
          driverName: 'Entrer Nom du Chauffeur',
          driverPhone: 'Entrer Telephone du Chauffeur'
        },
        status: 'Statut',
        active: 'Actif',
        inactive: 'Inactif',
        actions: 'Actions',
        search: 'Rechercher des bus...',
        filterAll: 'Tous',
        filterAvailable: 'Disponible',
        filterUnavailable: 'Indisponible',
        confirmDelete: 'Le bus sera supprimé complètement, êtes-vous sûr de vouloir supprimer ce bus ?',
        confirmEdit: 'Voulez-vous vraiment modifier ce bus ?',
        confirmAdd: 'Voulez-vous vraiment ajouter un nouveau bus ?',
        busExists: 'Le numéro de bus existe déjà',
        busExistsMessage: 'Vous ne pouvez pas utiliser ce numéro car il appartient à un autre bus',
        editSuccess: 'Le bus a été modifié avec succès',
        addSuccess: 'Le bus a été ajouté avec succès',
        deleteSuccess: 'Le bus a été supprimé avec succès',
        errorEditMessage: 'Une erreur est survenue lors de la modification du bus',
        errorAddMessage: 'Une erreur est survenue lors de l\'ajout du bus',
        errorDeleteMessage: 'Une erreur est survenue lors de la suppression du bus'
      },
      statistics: {
        title: 'Tableau de Bord Statistique',
        totalBuses: 'Total des Bus',
        activeBuses: 'Bus Actifs',
        inactiveBuses: 'Bus Inactifs',
        totalRoutes: 'Total des Itinéraires',
        totalStations: 'Total des Stations',
        coveredStations: 'Stations Couvertes',
        uncoveredStations: 'Stations Non Desservies'
      },
      routes: {
        mainStation: 'Station Principale',
        selectStation: 'Sélectionner la Station',
        universitySection: 'Section Universitaire',
        selectSection: 'Sélectionner la Section',
        internalStations: 'Stations Internes',
        addStation: 'Ajouter une Nouvelle Station',
        buses: 'Bus',
        selectBus: 'Sélectionner un Bus',
        goSchedules: 'Horaires de Départ',
        backSchedules: 'Horaires de Retour',
        selectTime: 'Sélectionner l\'Heure',
        enterTime: 'Entrer l\'Heure',
        title: 'Gestion des Itinéraires',
        search: 'Rechercher des itinéraires...',
        addRoute: 'Ajouter un Nouvel Itinéraire',
        editRoute: 'Modifier l\'Itinéraire',
        routeNumber: 'Numéro d\'Itinéraire',
        routeName: 'Nom d\'Itinéraire',
        startPoint: 'Point de Départ',
        endPoint: 'Point d\'Arrivée',
        success: 'Succès',
        successMsg: 'L\'opération a été réalisée avec succès',
        addSuccessMsg: 'L\'itinéraire a été ajouté avec succès',
        updateMsg: 'Les données ont been mis à jour avec succès',
        deleteMsg: 'L\'itinéraire a été supprimé avec succès',
        error: 'Échec',
        errorMsg: 'Une erreur s\'est produite lors de l\'opération',
        errorNetwork: 'Opération echouée : Une erreur de connexion au serveur s\'est produite',
        status: 'Statut',
        confirm: 'Confirmer',
        cancel: 'Annuler',
        active: 'Actif',
        inactive: 'Inactif',
        actions: 'Actions',
        to: 'Vers',
        routeExists: 'Cet Itinéraire existe deja',
        confirmation: 'Êtes-vous sûr?',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cet itinéraire?',
        confirmEdit: 'Êtes-vous sûr de vouloir modifier cet itinéraire?',
        confirmAdd: 'Êtes-vous sûr de vouloir ajouter cet itinéraire?',
        enter: {
          routeNumber: 'Entrer le Numéro d\'Itinéraire',
          routeName: 'Entrer le Nom d\'Itinéraire',
          startPoint: 'Entrer le Point de Départ',
          endPoint: 'Entrer le Point d\'Arrivée'
        },
        filterAll: 'Tous les Itinéraires',
        filterActive: 'Itinéraires Actifs',
        filterInactive: 'Itinéraires Inactifs'
      },
      stations: {
        title: 'Gestion des Stations',
        search: 'Rechercher des stations...',
        addStation: 'Ajouter une Nouvelle Station',
        editStation: 'Modifier la Station',
        stationNumber: 'Numéro de Station',
        stationName: 'Nom de la Station',
        location: 'Emplacement',
        status: 'Statut',
        active: 'Actif',
        inactive: 'Inactif',
        actions: 'Actions',
        confirmDelete: 'Êtes-vous sûr de vouloir supprimer cette station ?',
        confirmEdit: 'Êtes-vous sûr de vouloir modifier le nom de cette station ?',
        confirmAdd: 'Êtes-vous sûr de vouloir ajouter cette station ?',
        success: 'Succès',
        successMsg: 'L\'opération a été réalisée avec succès',
        updateMsg: 'Les données ont été mises à jour avec succès',
        error: 'Échec',
        errorMsg: 'Une erreur s\'est produite lors de l\'opération',
        errorNetwork: 'Opération echouée : Une erreur de connexion au serveur s\'est produite',
        confirm: 'Confirmer',
        cancel: 'Annuler',
        confirmation: 'Êtes-vous sûr ?',
        enter: {
          stationNumber: 'Entrer le Numéro de Station',
          stationName: 'Entrer le Nom de la Station',
          location: 'Entrer l\'Emplacement'
        },
        filterAll: 'Toutes les Stations',
        filterActive: 'Stations Actives',
        filterInactive: 'Stations Inactives'
      },
      home: {
        title: 'Tableau de Bord',
        welcome: 'Bienvenue au Système de Gestion des Bus',
        summary: 'Aperçu du Système',
        quickActions: 'Actions Rapides',
        recentActivity: 'Activité Récente'
      }
    }
  },
  ar: {
    navLogo: "نظام مراقبة حافلات الجامعة",
    nav: {
      about: "حول",
      services: "الخدمات",
      contact: "اتصل بنا"
    },
    home: {
      slides: {
        welcome: "مرحباً بكم في جامعة بسكرة",
        transport: "نقل جامعي حديث",
        connect: "ربط الحياة الجامعية"
      },
      hero: {
        title: " خدمة النقل الجامعي لجامعة بسكرة",
        subtitle: "ربط الطلاب عبر الحرم الجامعي بنقل موثوق وفعال"
      },
      about: {
        title: "حول خدماتنا",
        mission: "مهمتنا",
        description: "توفير خدمات نقل موثوقة وآمنة وفعالة لربط مجتمعنا الجامعي.",
        routes: "مسارات واسعة",
        routesDesc: "مسارات متعددة تغطي جميع مواقع الحرم الجامعي الرئيسية ومناطق سكن الطلاب.",
        students: "التركيز على الطلاب",
        studentsDesc: "مصممة لتلبية جداول واحتياجات الطلاب، وضمان سهولة الوصول إلى المرافق التعليمية."
      },
      services: {
        title: "خدماتنا",
        fleet: "أسطول حديث",
        fleetDesc: "يضمن أسطولنا من الحافلات الحديثة نقلاً مريحاً وآمناً لجميع الطلاب.",
        schedule: "جدول منتظم",
        scheduleDesc: "خدمة حافلات منتظمة وموثوقة طوال اليوم الدراسي وساعات المساء."
      },
      contact: {
        title: "معلومات الاتصال",
        office: "مكتب النقل",
        email: "البريد الإلكتروني",
        location: "الموقع",
        address: "جامعة بسكرة، الجزائر"
      },
      footer: {
        about: "جامعة بسكرة",
        description: "تقديم خدمات تعليمية ونقل عالية الجودة",
        quickLinks: "روابط سريعة",
        contact: "معلومات الاتصال",
        copyright: "جامعة بسكرة. جميع الحقوق محفوظة."
      }
    },
    admin: {
      sidebar: {
        title: "مراقبة الحافلات",
        home: "الرئيسية",
        universitySection: "الفرع الجامعي",
        routes: "المسارات",
        buses: "الحافلات",
        stations: "المحطات",
        statistics: "الإحصائيات",
        language: "اللغة",
        logout: "تسجيل الخروج"
      },
      validationErrors: {
        stationName: 'يرجى تحديد اسم المحطة',
        NUMERO_BUS: 'يرجى إدخال رقم حافلة صالح',
        nomChauffeur: 'يرجى إدخال اسم سائق صالح',
        telephoneChauffeur: 'يرجى إدخال رقم هاتف صالح يبدأ بـ 05 أو 06 أو 07 ويتكون من 10 أرقام',
        universitySection: 'يرجى اختيار القسم الجامعي!',
        mainStation: 'يرجى اختيار المحطة الرئيسية',
        internalStations: 'يرجى تحديد محطة داخلية واحدة على الأقل',
        buses: 'يرجى اختيار حافلة لهذا المسار',
        goSchedules: 'يرجى اختيار جدول الذهاب لهذا المسار',
        backSchedules: 'يرجى اختيار جدول العودة لهذا المسار'
      },
      language: {
        en: 'الإنجليزية',
        fr: 'الفرنسية',
        ar: 'العربية'
      },
      alerts: {
        success: 'نجاح',
        error: 'خطأ',
        warning: 'تحذير',
        info: 'معلومات',
        saved: 'تم حفظ التغييرات بنجاح',
        deleted: 'تم حذف العنصر بنجاح',
        updated: 'تم تحديث العنصر بنجاح',
        created: 'تم إنشاء العنصر بنجاح',
        operationFailed: 'فشل العملية'
      },
      forms: {
        save: 'حفظ',
        cancel: 'إلغاء',
        edit: 'تعديل',
        delete: 'حذف',
        create: 'إنشاء',
        search: 'بحث',
        filter: 'تصفية',
        select: 'اختيار'
      },
      errors: {
       loadingData:'تحميل البيانات...',
       error:'خطأ لا يمكن تحميل البيانات بسبب خطأ في السيرفر او خطأ في الاتصال',
      },
      univSection: {
        addUnivSection:"إضافة فرع جامعي",
        searchUniv:'البحث عن فرع جامعي',
        confirmAdd: 'هل أنت متأكد من اضافة هذه الجامعة؟',
        confirmDelete: 'هل أنت متأكد من حذف هذه الجامعة أو الفرع الجامعي؟',
        confirmation: 'هل أنت متأكد؟',
        deleteNoticeText: {
          allInfo: 'سيؤدي هذا إلى حذف جميع المعلومات المتعلقة بها.',
          allRoutes: 'سيؤدي هذا إلى حذف جميع المسارات الخاصة بهذه الجامعة.',
          allBuses: 'سيؤدي هذا إلى جعل جميع حافلاته مجانية ومتاحة للاستخدام.'
        }
        
      },
      
      buses: {
        confirm: 'تأكيد',
        title: 'إدارة الحافلات',
        addBus: 'إضافة حافلة جديدة',
        editBus: 'تعديل الحافلة',
        busNumber: 'رقم الحافلة',
        driverName: 'اسم السائق',
        driverPhone: 'هاتف السائق',
        enter: {
          busNumber: 'رقم الحافلة',
          driverName: 'اسم السائق',
          driverPhone: 'هاتف السائق'
        },
        confirmation: 'هل أنت متأكد',
        status: 'الحالة',
        active: 'نشط',
        inactive: 'غير نشط',
        actions: 'الإجراءات',
        search: 'البحث عن الحافلات...',
        filterAll: 'الكل',
        filterAvailable: 'متوفر',
        filterUnavailable: 'غير متوفر',
        confirmDelete: 'سيتم حذف الحافلة نهائيًا، هل أنت متأكد أنك تريد حذف هذه الحافلة؟',
        confirmEdit: 'هل تريد حقاً تعديل هذه الحافلة؟',
        confirmAdd: 'هل تريد حقاً إضافة حافلة جديدة؟',
        busExists: 'رقم الحافلة موجود مسبقاً',
        busExistsMessage: 'لا يمكنك استخدام هذا الرقم لأنه يخص حافلة أخرى',
        editSuccess: 'تم تعديل الحافلة بنجاح',
        addSuccess: 'تم إضافة الحافلة بنجاح',
        deleteSuccess: 'تم حذف الحافلة بنجاح',
        errorEditMessage: 'حدث خطأ أثناء تعديل الحافلة',
        errorAddMessage: 'حدث خطأ أثناء إضافة الحافلة',
        errorDeleteMessage: 'حدث خطأ أثناء حذف الحافلة',
        errorMessage: 'حدث خطأ أثناء تعديل الحافلة'
      },
      statistics: {
        title: 'لوحة الإحصائيات',
        totalBuses: 'إجمالي الحافلات',
        activeBuses: 'الحافلات النشطة',
        inactiveBuses: 'الحافلات غير النشطة',
        totalRoutes: 'إجمالي المسارات',
        totalStations: 'إجمالي المحطات',
        coveredStations: 'المحطات المخدومة',
        uncoveredStations: 'المحطات غير المخدومة'
      },
      routes: {
        mainStation: ' المحطة الأساسية',
        selectStation: 'إختيار المحطة',
        universitySection: 'الفرع الجامعي',
        selectSection: 'إختيار الفرع',
        internalStations: 'المحطات الداخلية',
        addStation: 'إضافة محطة جديدة',
        buses: 'الحافلات',
        selectBus: 'إختيار الحافلة',
        goSchedules: 'وقت الذهاب',
        backSchedules: 'وقت العودة',
        selectTime: 'إختيار الوقت',
        enterTime: 'أدخل الوقت',
        title: 'إدارة المسارات',
        search: 'البحث عن المسارات...',
        addRoute: 'إضافة مسار جديد',
        editRoute: 'تعديل المسار',
        routeNumber: 'رقم المسار',
        routeName: 'اسم المسار',
        startPoint: 'نقطة البداية',
        endPoint: 'نقطة النهاية',
        success: 'نجاح',
        addSuccessMsg: 'تمت إضافة المسار بنجاح',
        updateMsg: 'تم تحديث المسار بنجاح',
        deleteMsg: 'تم حذف المسار بنجاح',
        successMsg: 'تمت العملية بنجاح',
        error: 'فشل',
        errorMsg: 'حدث خطأ أثناء العملية',
        errorNetwork: 'فشل العملية: حدث خطاء في الاتصال بالسيرفر',
        status: 'الحالة',
        confirm: 'تأكيد',
        cancel: 'الغاء',
        active: 'نشط',
        inactive: 'غير نشط',
        actions: 'الإجراءات',
        to: 'الى',
        routeExists: 'هذا المسار موجود بالفعل',
        confirmation: 'هل أنت متأكد',
        confirmDelete: 'هل أنت متأكد من حذف هذا المسار؟',
        confirmEdit: 'هل أنت متأكد من تعديل هذا المسار؟',
        confirmAdd: 'هل أنت متأكد من اضافة هذا المسار؟',
        enter: {
          routeNumber: 'أدخل رقم المسار',
          routeName: 'أدخل اسم المسار',
          startPoint: 'أدخل نقطة البداية',
          endPoint: 'أدخل نقطة النهاية'
        },
        filterAll: 'جميع المسارات',
        filterActive: 'المسارات النشطة',
        filterInactive: 'المسارات غير النشطة'
      },
      stations: {
        title: 'إدارة المحطات',
        search: 'البحث عن المحطات...',
        addStation: 'إضافة محطة جديدة',
        editStation: 'تعديل المحطة',
        stationNumber: 'رقم المحطة',
        stationName: 'اسم المحطة',
        location: 'الموقع',
        status: 'الحالة',
        active: 'نشط',
        inactive: 'غير نشط',
        actions: 'الإجراءات',
        confirmDelete: 'هل أنت متأكد من حذف هذه المحطة؟',
        confirmEdit: 'هل أنت متأكد من تعديل اسم هذه المحطة؟',
        confirmAdd: 'هل أنت متأكد من اضافة هذه المحطة؟',
        success: 'نجاح',
        successMsg: 'تمت العملية بنجاح',
        updateMsg: 'تم تحديث البيانات بنجاح',
        error: 'فشل',
        errorMsg: 'حدث خطأ أثناء العملية',
        errorNetwork: 'فشل العملية: حدث خطاء في الاتصال بالسيرفر',
        status: 'الحالة',
        confirm: 'تأكيد',
        cancel: 'الغاء',
        confirmation: 'هل أنت متأكد',
        enter: {
          stationNumber: 'أدخل رقم المحطة',
          stationName: 'أدخل اسم المحطة',
          location: 'أدخل الموقع'
        },
        filterAll: 'جميع المحطات',
        filterActive: 'المحطات النشطة',
        filterInactive: 'المحطات غير النشطة'
      },
      home: {
        title: 'لوحة التحكم',
        welcome: 'مرحباً بك في نظام إدارة الحافلات',
        summary: 'نظرة عامة على النظام',
        quickActions: 'إجراءات سريعة',
        recentActivity: 'النشاط الأخير'
      }
    }
  }
};
