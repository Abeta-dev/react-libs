/* eslint-disable sonarjs/cognitive-complexity, sonarjs/pseudo-random */
import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { toast } from "sonner";
import { Toaster as SonnerToaster } from "../../components/ui/feedback/sonner";
import { Input } from "../../components/ui/forms/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/forms/select";
import { FileUpload, type FileItem } from "../../components/ui/forms/file-upload";
import { Checkbox } from "../../components/ui/forms/checkbox";
import { Button } from "../../components/ui/forms/button";
import { Label } from "../../components/ui/forms/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/layout/card";
import { Badge } from "../../components/ui/data-display/badge";
import { StatusBadge } from "../../components/ui/data-display/status-badge";
import { Stepper, type StepItem } from "../../components/ui/navigation/stepper";
import { LanguageToggle, type LanguageOption } from "../../components/ui/core/language-toggle";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/overlays/dialog";
import {
  validateGSTIN,
  validatePAN,
  validateIFSC,
  validatePincode,
  validateBankAccountIN,
} from "../../india/validators";
import {
  Building2,
  ShieldCheck,
  Landmark,
  FileCheck2,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Sparkles,
  FileText,
  RotateCcw,
} from "lucide-react";

const meta: Meta = {
  title: "Living Enterprise Workflows/Vendor Onboarding & KYC Flow",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Production-grade Indian enterprise vendor registration and KYC verification workflow. " +
          "Includes 4-step progression, bilingual English/Hindi toggling, live GSTIN/PAN/IFSC validation, " +
          "simulated statutory document uploads, and formal compliance submission confirmation.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <VendorOnboardingWorkflow />,
};

type AppLanguage = "en" | "hi";

const SUPPORTED_LANGUAGES: LanguageOption<AppLanguage>[] = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी" },
];

interface FormData {
  // Step 1: Company Profile
  legalName: string;
  tradeName: string;
  entityType: string;
  businessCategory: string;
  addressLine1: string;
  city: string;
  state: string;
  pincode: string;

  // Step 2: Statutory KYC
  gstin: string;
  pan: string;
  msmeNumber: string;
  fssaiNumber: string;
  kycDocuments: FileItem[];

  // Step 3: Banking & UPI
  accountHolderName: string;
  accountNumber: string;
  confirmAccountNumber: string;
  ifscCode: string;
  bankName: string;
  branchName: string;
  accountType: string;
  upiId: string;
  bankDocuments: FileItem[];

  // Step 4: Verification & Submission
  agreeTerms: boolean;
  confirmStatutoryAccuracy: boolean;
  authorizedSignatoryName: string;
  authorizedSignatoryDesignation: string;
}

const INITIAL_FORM_DATA: FormData = {
  legalName: "Acme Industrial Corp Pvt Ltd",
  tradeName: "Acme Industrial",
  entityType: "pvt_ltd",
  businessCategory: "manufacturing",
  addressLine1: "Plot 42, MIDC Industrial Area, Phase II",
  city: "Pune",
  state: "Maharashtra",
  pincode: "411018",

  gstin: "27AABCU9603R1ZM",
  pan: "AABCU9603R",
  msmeNumber: "UDYAM-MH-26-0019284",
  fssaiNumber: "",
  kycDocuments: [],

  accountHolderName: "ACME INDUSTRIAL CORP PVT LTD",
  accountNumber: "50200049281726",
  confirmAccountNumber: "50200049281726",
  ifscCode: "HDFC0001234",
  bankName: "HDFC Bank Ltd",
  branchName: "Pimpri-Chinchwad Corporate Branch",
  accountType: "current",
  upiId: "acmeindustrial@okhdfcbank",
  bankDocuments: [],

  agreeTerms: false,
  confirmStatutoryAccuracy: false,
  authorizedSignatoryName: "Rajeshwar Sharma",
  authorizedSignatoryDesignation: "Director - Finance & Supply Chain",
};

const I18N = {
  en: {
    portalBadge: "Enterprise Vendor Procurement Portal",
    pageTitle: "Vendor Registration & Statutory KYC Flow",
    pageSubtitle: "Complete statutory verification under Indian GST, Income Tax, and MSME Development Act",
    step1Title: "Company Profile",
    step1Desc: "Basic corporate identity and registered address",
    step2Title: "Statutory KYC",
    step2Desc: "GSTIN, PAN, and government registrations",
    step3Title: "Banking & UPI",
    step3Desc: "Settlement account and digital VPA routing",
    step4Title: "Verification & Submit",
    step4Desc: "Executive review and authorized declaration",

    // Step 1 labels
    legalNameLabel: "Company Legal Name",
    legalNameHint: "As per Certificate of Incorporation / GST Registration",
    tradeNameLabel: "Trade Name (DBA)",
    entityTypeLabel: "Entity Legal Structure",
    categoryLabel: "Primary Industry Segment",
    addressLabel: "Registered Office Address",
    cityLabel: "City / District",
    stateLabel: "State / UT",
    pincodeLabel: "Pincode (6-digit)",

    // Step 2 labels
    gstinLabel: "Goods & Services Tax ID (GSTIN)",
    gstinHint: "15-character statutory GST identifier (e.g. 27AABCU9603R1ZM)",
    panLabel: "Permanent Account Number (PAN)",
    panHint: "10-character corporate or proprietor PAN",
    msmeLabel: "MSME Udyam Registration Number",
    msmeHint: "Format: UDYAM-XX-00-0000000",
    fssaiLabel: "FSSAI License (If applicable)",
    fssaiHint: "14-digit food safety license for consumables suppliers",
    kycUploadLabel: "Upload Statutory Certificates (GST Certificate & PAN Card)",
    kycUploadHint: "PDF, PNG, or JPG up to 5MB",

    // Step 3 labels
    accountHolderLabel: "Beneficiary Account Holder Name",
    accountHolderHint: "Must exactly match corporate bank records",
    accountNumberLabel: "Bank Account Number",
    confirmAccountLabel: "Confirm Bank Account Number",
    ifscLabel: "Bank IFSC Code",
    ifscHint: "11-character code (e.g. HDFC0001234)",
    accountTypeLabel: "Account Type",
    upiLabel: "UPI Virtual Payment Address (VPA)",
    upiHint: "For instant MSME payments under ₹1,00,000",
    bankUploadLabel: "Upload Cancelled Cheque / Bank Passbook",
    bankUploadHint: "Cancelled cheque showing Printed Account Name and IFSC",

    // Step 4 labels
    summaryReviewTitle: "Statutory Onboarding Summary",
    declarationTitle: "Authorized Statutory Declarations",
    declaration1: "I confirm that all provided GSTIN, PAN, and Bank details are authentic and legally active.",
    declaration2: "I accept the Master Service Agreement (MSA) and Enterprise Vendor Code of Conduct.",
    signatoryNameLabel: "Authorized Signatory Name",
    signatoryDesignationLabel: "Designation / Title",

    // Actions
    btnNext: "Proceed to Next Step",
    btnBack: "Back",
    btnSubmit: "Submit Registration for Audit",
    btnAttachSample: "Prefill Sample KYC Docs",
    btnReset: "Reset Form",
    validationErrorAlert: "Please correct the highlighted statutory errors before proceeding.",
    modalTitle: "Vendor Registration Submitted Successfully!",
    modalDesc: "Your dossier has been routed to the Vendor Onboarding Compliance Cell.",
    appIdLabel: "Vendor Application ID",
    slaLabel: "Audit & Verification SLA",
    slaValue: "Within 24 to 48 business hours",
    statusBadgeLabel: "KYC Audit in Progress",
    btnDone: "Return to Vendor Dashboard",
    copySuccess: "Registration ID copied to clipboard!",
  },
  hi: {
    portalBadge: "उद्यम विक्रेता खरीद पोर्टल",
    pageTitle: "विक्रेता पंजीकरण एवं वैधानिक केवाईसी प्रक्रिया",
    pageSubtitle: "भारतीय जीएसटी, आयकर, और एमएसएमई विकास अधिनियम के तहत वैधानिक सत्यापन पूर्ण करें",
    step1Title: "कंपनी प्रोफ़ाइल",
    step1Desc: "मूल कॉर्पोरेट पहचान और पंजीकृत पता",
    step2Title: "वैधानिक केवाईसी",
    step2Desc: "जीएसटीआईएन, पैन और सरकारी पंजीकरण",
    step3Title: "बैंकिंग एवं यूपीआई",
    step3Desc: "भुगतान खाता और डिजिटल वीपीए रूटिंग",
    step4Title: "सत्यापन एवं सबमिट",
    step4Desc: "अंतिम समीक्षा और अधिकृत घोषणा",

    // Step 1 labels
    legalNameLabel: "कंपनी का कानूनी नाम",
    legalNameHint: "निगमन प्रमाणपत्र या जीएसटी पंजीकरण के अनुसार",
    tradeNameLabel: "व्यापार नाम (ट्रेड नाम)",
    entityTypeLabel: "कानूनी संरचना (संस्था का प्रकार)",
    categoryLabel: "प्राथमिक उद्योग श्रेणी",
    addressLabel: "पंजीकृत कार्यालय का पता",
    cityLabel: "शहर / ज़िला",
    stateLabel: "राज्य / केंद्र शासित प्रदेश",
    pincodeLabel: "पिनकोड (6-अंक)",

    // Step 2 labels
    gstinLabel: "वस्तु एवं सेवा कर पहचान संख्या (GSTIN)",
    gstinHint: "15-अक्षरों का वैधानिक जीएसटी पहचानकर्ता (उदा. 27AABCU9603R1ZM)",
    panLabel: "स्थायी खाता संख्या (PAN)",
    panHint: "10-अक्षरों का कॉर्पोरेट या प्रोप्राइटर पैन",
    msmeLabel: "एमएसएमई उद्यम पंजीकरण संख्या",
    msmeHint: "प्रारूप: UDYAM-XX-00-0000000",
    fssaiLabel: "FSSAI लाइसेंस (यदि लागू हो)",
    fssaiHint: "खाद्य सामग्री विक्रेताओं के लिए 14 अंकों का लाइसेंस",
    kycUploadLabel: "वैधानिक प्रमाणपत्र अपलोड करें (GST और पैन कार्ड)",
    kycUploadHint: "पीडीएफ, पीएनजी या जेपीजी (अधिकतम 5MB)",

    // Step 3 labels
    accountHolderLabel: "लाभार्थी खाताधारक का नाम",
    accountHolderHint: "बैंक रिकॉर्ड से पूरी तरह मेल खाना चाहिए",
    accountNumberLabel: "बैंक खाता संख्या",
    confirmAccountLabel: "खाता संख्या की पुष्टि करें",
    ifscLabel: "बैंक आईएफएससी कोड",
    ifscHint: "11-अक्षरों का कोड (उदा. HDFC0001234)",
    accountTypeLabel: "खाते का प्रकार",
    upiLabel: "यूपीआई वर्चुअल पेमेंट एड्रेस (VPA)",
    upiHint: "₹1,00,000 से कम के त्वरित भुगतान हेतु",
    bankUploadLabel: "रद्द चेक / बैंक पासबुक प्रतिलिपि अपलोड करें",
    bankUploadHint: "मुद्रित खाता नाम और IFSC प्रदर्शित करने वाला रद्द चेक",

    // Step 4 labels
    summaryReviewTitle: "वैधानिक पंजीकरण सारांश",
    declarationTitle: "अधिकृत वैधानिक घोषणाएं",
    declaration1: "मैं पुष्टि करता हूँ कि प्रदान किए गए जीएसटी, पैन एवं बैंक विवरण प्रामाणिक और सक्रिय हैं।",
    declaration2: "मैं मास्टर सर्विस एग्रीमेंट (MSA) और विक्रेता आचार संहिता को स्वीकार करता हूँ।",
    signatoryNameLabel: "अधिकृत हस्ताक्षरकर्ता का नाम",
    signatoryDesignationLabel: "पद / पदनाम",

    // Actions
    btnNext: "अगले चरण पर जाएँ",
    btnBack: "पीछे जाएँ",
    btnSubmit: "सत्यापन के लिए सबमिट करें",
    btnAttachSample: "नमूना केवाईसी दस्तावेज़ जोड़ें",
    btnReset: "फॉर्म रीसेट करें",
    validationErrorAlert: "आगे बढ़ने से पहले कृपया हाइलाइट की गई त्रुटियों को ठीक करें।",
    modalTitle: "विक्रेता पंजीकरण सफलतापूर्वक सबमिट किया गया!",
    modalDesc: "आपका आवेदन विक्रेता अनुपालन प्रकोष्ठ को भेज दिया गया है।",
    appIdLabel: "विक्रेता आवेदन संख्या",
    slaLabel: "सत्यापन समयसीमा (SLA)",
    slaValue: "24 से 48 कार्य घंटों के भीतर",
    statusBadgeLabel: "केवाईसी समीक्षा प्रगति पर है",
    btnDone: "विक्रेता डैशबोर्ड पर लौटें",
    copySuccess: "पंजीकरण आईडी क्लिपबोर्ड पर कॉपी हो गई!",
  },
};

function createMockFileItem(fileName: string, type: string, size: number): FileItem {
  const blob = new Blob([new Uint8Array(Math.min(size, 1024))], { type });
  const file = new File([blob], fileName, { type, lastModified: Date.now() });
  return {
    id: `mock-${fileName}-${Date.now()}`,
    file,
    progress: 100,
  };
}

function VendorOnboardingWorkflow() {
  const [language, setLanguage] = React.useState<AppLanguage>("en");
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState<FormData>(INITIAL_FORM_DATA);
  const [touchedFields, setTouchedFields] = React.useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);
  const [applicationId, setApplicationId] = React.useState("");
  const [copiedId, setCopiedId] = React.useState(false);

  const t = I18N[language];

  // Validation logic
  const errors = React.useMemo(() => {
    const errs: Record<string, string> = {};

    // Step 1 Validation
    if (!formData.legalName.trim()) {
      errs["legalName"] = language === "hi" ? "कानूनी नाम आवश्यक है" : "Company Legal Name is required";
    }
    if (!formData.addressLine1.trim()) {
      errs["addressLine1"] = language === "hi" ? "पंजीकृत पता आवश्यक है" : "Address is required";
    }
    if (!formData.city.trim()) {
      errs["city"] = language === "hi" ? "शहर आवश्यक है" : "City is required";
    }
    const pincodeErr = validatePincode(formData.pincode, { language });
    if (pincodeErr) errs["pincode"] = pincodeErr;

    // Step 2 Validation
    const gstinErr = validateGSTIN(formData.gstin, { language });
    if (gstinErr) errs["gstin"] = gstinErr;

    const panErr = validatePAN(formData.pan, { language });
    if (panErr) errs["pan"] = panErr;

    if (formData.msmeNumber && !formData.msmeNumber.startsWith("UDYAM-")) {
      errs["msmeNumber"] =
        language === "hi"
          ? "उद्यम संख्या 'UDYAM-' से शुरू होनी चाहिए"
          : "MSME Udyam registration must start with 'UDYAM-'";
    }

    // Step 3 Validation
    if (!formData.accountHolderName.trim()) {
      errs["accountHolderName"] =
        language === "hi" ? "खाताधारक का नाम आवश्यक है" : "Account Holder Name is required";
    }
    const bankAccErr = validateBankAccountIN(formData.accountNumber, { language });
    if (bankAccErr) errs["accountNumber"] = bankAccErr;

    if (formData.accountNumber !== formData.confirmAccountNumber) {
      errs["confirmAccountNumber"] =
        language === "hi" ? "खाता संख्या मेल नहीं खाती" : "Account numbers do not match";
    }

    const ifscErr = validateIFSC(formData.ifscCode, { language });
    if (ifscErr) errs["ifscCode"] = ifscErr;

    // Step 4 Validation
    if (!formData.agreeTerms) {
      errs["agreeTerms"] =
        language === "hi" ? "नियम और शर्तों की स्वीकृति आवश्यक है" : "You must accept the terms & conditions";
    }
    if (!formData.confirmStatutoryAccuracy) {
      errs["confirmStatutoryAccuracy"] =
        language === "hi" ? "वैधानिक सटीकता की पुष्टि आवश्यक है" : "You must confirm statutory accuracy";
    }
    if (!formData.authorizedSignatoryName.trim()) {
      errs["authorizedSignatoryName"] =
        language === "hi" ? "हस्ताक्षरकर्ता का नाम आवश्यक है" : "Authorized Signatory Name is required";
    }

    return errs;
  }, [formData, language]);

  const stepHasErrors = (stepIndex: number): boolean => {
    if (stepIndex === 0) {
      return Boolean(errors["legalName"] || errors["addressLine1"] || errors["city"] || errors["pincode"]);
    }
    if (stepIndex === 1) {
      return Boolean(errors["gstin"] || errors["pan"] || errors["msmeNumber"]);
    }
    if (stepIndex === 2) {
      return Boolean(
        errors["accountHolderName"] ||
          errors["accountNumber"] ||
          errors["confirmAccountNumber"] ||
          errors["ifscCode"]
      );
    }
    if (stepIndex === 3) {
      return Boolean(
        errors["agreeTerms"] || errors["confirmStatutoryAccuracy"] || errors["authorizedSignatoryName"]
      );
    }
    return false;
  };

  const steps: StepItem[] = [
    {
      title: t.step1Title,
      description: t.step1Desc,
      icon: <Building2 className="h-4 w-4" />,
      isError: stepHasErrors(0) && currentStep > 0,
    },
    {
      title: t.step2Title,
      description: t.step2Desc,
      icon: <ShieldCheck className="h-4 w-4" />,
      isError: stepHasErrors(1) && currentStep > 1,
    },
    {
      title: t.step3Title,
      description: t.step3Desc,
      icon: <Landmark className="h-4 w-4" />,
      isError: stepHasErrors(2) && currentStep > 2,
    },
    {
      title: t.step4Title,
      description: t.step4Desc,
      icon: <FileCheck2 className="h-4 w-4" />,
      isError: stepHasErrors(3) && currentStep === 3 && Object.keys(errors).length > 0,
    },
  ];

  const handleBlur = (field: string) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  const handleNext = () => {
    // Touch current step's fields
    if (currentStep === 0) {
      setTouchedFields((prev) => ({
        ...prev,
        legalName: true,
        addressLine1: true,
        city: true,
        pincode: true,
      }));
      if (stepHasErrors(0)) {
        toast.error(t.validationErrorAlert);
        return;
      }
    } else if (currentStep === 1) {
      setTouchedFields((prev) => ({
        ...prev,
        gstin: true,
        pan: true,
        msmeNumber: true,
      }));
      if (stepHasErrors(1)) {
        toast.error(t.validationErrorAlert);
        return;
      }
    } else if (currentStep === 2) {
      setTouchedFields((prev) => ({
        ...prev,
        accountHolderName: true,
        accountNumber: true,
        confirmAccountNumber: true,
        ifscCode: true,
      }));
      if (stepHasErrors(2)) {
        toast.error(t.validationErrorAlert);
        return;
      }
    }

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleAttachSampleDocs = () => {
    const sampleKyc = [
      createMockFileItem("GST_Registration_Certificate_MH.pdf", "application/pdf", 1420500),
      createMockFileItem("Corporate_PAN_AABCU9603R.pdf", "application/pdf", 894000),
    ];
    const sampleBank = [
      createMockFileItem("Cancelled_Cheque_HDFC_Acme.pdf", "application/pdf", 982300),
    ];

    setFormData((prev) => ({
      ...prev,
      kycDocuments: [...prev.kycDocuments, ...sampleKyc],
      bankDocuments: [...prev.bankDocuments, ...sampleBank],
    }));

    toast.success(language === "hi" ? "नमूना दस्तावेज़ संलग्न किए गए" : "Sample KYC documents attached!");
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_DATA);
    setTouchedFields({});
    setCurrentStep(0);
    toast.info(language === "hi" ? "फॉर्म रीसेट किया गया" : "Form reset to default corporate preset.");
  };

  const handleSubmit = () => {
    setTouchedFields({
      agreeTerms: true,
      confirmStatutoryAccuracy: true,
      authorizedSignatoryName: true,
    });

    if (Object.keys(errors).length > 0) {
      toast.error(t.validationErrorAlert);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedId = `VEN-IND-2026-${Math.floor(100000 + Math.random() * 900000)}`;
      setApplicationId(generatedId);
      setShowSuccessModal(true);
      toast.success(
        language === "hi"
          ? `पंजीकरण सबमिट: ${generatedId}`
          : `Registration submitted successfully as ${generatedId}`
      );
    }, 1200);
  };

  const handleCopyId = () => {
    if (applicationId && navigator.clipboard) {
      navigator.clipboard.writeText(applicationId);
      setCopiedId(true);
      toast.success(t.copySuccess);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 p-4 sm:p-8 font-sans text-slate-900 dark:text-slate-100 transition-colors">
      <SonnerToaster />

      {/* Main Container */}
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Top Header Card with Language Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-primary border-primary/30 font-semibold px-2.5 py-0.5 text-xs">
                <Sparkles className="w-3 h-3 mr-1" />
                {t.portalBadge}
              </Badge>
              <span className="text-xs text-muted-foreground">• Live KYC Engine</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-slate-50">
              {t.pageTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              {t.pageSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 self-start sm:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleAttachSampleDocs}
              className="text-xs font-semibold gap-1.5 h-8"
              title="Quickly inject test document files"
            >
              <FileText className="w-3.5 h-3.5 text-primary" />
              <span>{t.btnAttachSample}</span>
            </Button>

            <LanguageToggle<AppLanguage>
              language={language}
              setLanguage={(lang) => {
                setLanguage(lang);
                toast.info(lang === "hi" ? "भाषा बदलकर हिन्दी की गई" : "Language set to English");
              }}
              languages={SUPPORTED_LANGUAGES}
            />
          </div>
        </div>

        {/* Stepper Card */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Stepper
            steps={steps}
            activeStep={currentStep}
            clickable={true}
            onStepClick={(stepIdx) => {
              if (stepIdx < currentStep || !stepHasErrors(currentStep)) {
                setCurrentStep(stepIdx);
              } else {
                toast.error(t.validationErrorAlert);
              }
            }}
          />
        </div>

        {/* Step 1: Company Profile */}
        {currentStep === 0 && (
          <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">{t.step1Title}</CardTitle>
                  <CardDescription className="text-xs">{t.step1Desc}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Legal Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="legalName" className="text-xs font-semibold">
                    {t.legalNameLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="legalName"
                    value={formData.legalName}
                    onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                    onBlur={() => handleBlur("legalName")}
                    placeholder="e.g. Acme Industrial Corp Pvt Ltd"
                    className={touchedFields["legalName"] && errors["legalName"] ? "border-destructive" : ""}
                  />
                  {touchedFields["legalName"] && errors["legalName"] ? (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["legalName"]}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">{t.legalNameHint}</p>
                  )}
                </div>

                {/* Trade Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="tradeName" className="text-xs font-semibold">
                    {t.tradeNameLabel}
                  </Label>
                  <Input
                    id="tradeName"
                    value={formData.tradeName}
                    onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
                    placeholder="e.g. Acme Industrial"
                  />
                </div>

                {/* Entity Type */}
                <div className="space-y-1.5">
                  <Label htmlFor="entityType" className="text-xs font-semibold">
                    {t.entityTypeLabel}
                  </Label>
                  <Select
                    value={formData.entityType}
                    onValueChange={(val) => setFormData({ ...formData, entityType: val })}
                  >
                    <SelectTrigger id="entityType">
                      <SelectValue placeholder="Select structure" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pvt_ltd">Private Limited Company (Pvt Ltd)</SelectItem>
                      <SelectItem value="public_ltd">Public Limited Company (Ltd)</SelectItem>
                      <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                      <SelectItem value="partnership">Partnership Firm</SelectItem>
                      <SelectItem value="proprietorship">Sole Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Business Category */}
                <div className="space-y-1.5">
                  <Label htmlFor="businessCategory" className="text-xs font-semibold">
                    {t.categoryLabel}
                  </Label>
                  <Select
                    value={formData.businessCategory}
                    onValueChange={(val) => setFormData({ ...formData, businessCategory: val })}
                  >
                    <SelectTrigger id="businessCategory">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manufacturing">Heavy Engineering & Manufacturing</SelectItem>
                      <SelectItem value="logistics">Logistics, Freight & Warehousing</SelectItem>
                      <SelectItem value="it_services">Information Technology & Software</SelectItem>
                      <SelectItem value="raw_materials">Raw Materials & Metallurgy</SelectItem>
                      <SelectItem value="chemicals">Industrial Chemicals & Solvents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Registered Address */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="addressLine1" className="text-xs font-semibold">
                    {t.addressLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                    onBlur={() => handleBlur("addressLine1")}
                    placeholder="Factory / Registered office premises"
                    className={touchedFields["addressLine1"] && errors["addressLine1"] ? "border-destructive" : ""}
                  />
                  {touchedFields["addressLine1"] && errors["addressLine1"] && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["addressLine1"]}
                    </p>
                  )}
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <Label htmlFor="city" className="text-xs font-semibold">
                    {t.cityLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    onBlur={() => handleBlur("city")}
                    placeholder="e.g. Pune"
                    className={touchedFields["city"] && errors["city"] ? "border-destructive" : ""}
                  />
                  {touchedFields["city"] && errors["city"] && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["city"]}
                    </p>
                  )}
                </div>

                {/* State & Pincode */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="state" className="text-xs font-semibold">
                      {t.stateLabel}
                    </Label>
                    <Input
                      id="state"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Maharashtra"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="pincode" className="text-xs font-semibold">
                      {t.pincodeLabel} <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="pincode"
                      maxLength={6}
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      onBlur={() => handleBlur("pincode")}
                      placeholder="411018"
                      className={touchedFields["pincode"] && errors["pincode"] ? "border-destructive" : ""}
                    />
                    {touchedFields["pincode"] && errors["pincode"] && (
                      <p className="text-[11px] text-destructive flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" /> {errors["pincode"]}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button variant="ghost" size="sm" onClick={handleResetForm} className="text-xs gap-1.5 text-muted-foreground">
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.btnReset}</span>
              </Button>
              <Button onClick={handleNext} className="gap-2 font-semibold">
                <span>{t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 2: Statutory KYC */}
        {currentStep === 1 && (
          <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">{t.step2Title}</CardTitle>
                  <CardDescription className="text-xs">{t.step2Desc}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* GSTIN */}
                <div className="space-y-1.5">
                  <Label htmlFor="gstin" className="text-xs font-semibold">
                    {t.gstinLabel} <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="gstin"
                      value={formData.gstin}
                      maxLength={15}
                      onChange={(e) => setFormData({ ...formData, gstin: e.target.value.toUpperCase() })}
                      onBlur={() => handleBlur("gstin")}
                      placeholder="27AABCU9603R1ZM"
                      className={`font-mono uppercase ${
                        touchedFields["gstin"] && errors["gstin"] ? "border-destructive" : ""
                      }`}
                    />
                    {!errors["gstin"] && formData.gstin.length === 15 && (
                      <span className="absolute right-2.5 top-2.5 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  {touchedFields["gstin"] && errors["gstin"] ? (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["gstin"]}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">{t.gstinHint}</p>
                  )}
                </div>

                {/* PAN */}
                <div className="space-y-1.5">
                  <Label htmlFor="pan" className="text-xs font-semibold">
                    {t.panLabel} <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="pan"
                      value={formData.pan}
                      maxLength={10}
                      onChange={(e) => setFormData({ ...formData, pan: e.target.value.toUpperCase() })}
                      onBlur={() => handleBlur("pan")}
                      placeholder="AABCU9603R"
                      className={`font-mono uppercase ${
                        touchedFields["pan"] && errors["pan"] ? "border-destructive" : ""
                      }`}
                    />
                    {!errors["pan"] && formData.pan.length === 10 && (
                      <span className="absolute right-2.5 top-2.5 text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                      </span>
                    )}
                  </div>
                  {touchedFields["pan"] && errors["pan"] ? (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["pan"]}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">{t.panHint}</p>
                  )}
                </div>

                {/* MSME */}
                <div className="space-y-1.5">
                  <Label htmlFor="msmeNumber" className="text-xs font-semibold">
                    {t.msmeLabel}
                  </Label>
                  <Input
                    id="msmeNumber"
                    value={formData.msmeNumber}
                    onChange={(e) => setFormData({ ...formData, msmeNumber: e.target.value.toUpperCase() })}
                    placeholder="UDYAM-MH-26-0019284"
                    className="font-mono uppercase"
                  />
                  <p className="text-[11px] text-muted-foreground">{t.msmeHint}</p>
                </div>

                {/* FSSAI */}
                <div className="space-y-1.5">
                  <Label htmlFor="fssaiNumber" className="text-xs font-semibold">
                    {t.fssaiLabel}
                  </Label>
                  <Input
                    id="fssaiNumber"
                    maxLength={14}
                    value={formData.fssaiNumber}
                    onChange={(e) => setFormData({ ...formData, fssaiNumber: e.target.value })}
                    placeholder="10012022000123"
                    className="font-mono"
                  />
                  <p className="text-[11px] text-muted-foreground">{t.fssaiHint}</p>
                </div>
              </div>

              {/* Document Upload Area */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Label className="text-xs font-semibold block">{t.kycUploadLabel}</Label>
                <FileUpload
                  value={formData.kycDocuments}
                  onChange={(files) => setFormData({ ...formData, kycDocuments: files })}
                  accept=".pdf,.png,.jpg,.jpeg"
                  maxSize={5 * 1024 * 1024}
                  multiple={true}
                  label="Click or drag GST & PAN certificates here"
                  description={t.kycUploadHint}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{t.btnBack}</span>
              </Button>
              <Button onClick={handleNext} className="gap-2 font-semibold">
                <span>{t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 3: Banking & UPI */}
        {currentStep === 2 && (
          <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">{t.step3Title}</CardTitle>
                  <CardDescription className="text-xs">{t.step3Desc}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Account Holder Name */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="accountHolderName" className="text-xs font-semibold">
                    {t.accountHolderLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={(e) => setFormData({ ...formData, accountHolderName: e.target.value.toUpperCase() })}
                    onBlur={() => handleBlur("accountHolderName")}
                    placeholder="ACME INDUSTRIAL CORP PVT LTD"
                    className={`uppercase font-mono ${
                      touchedFields["accountHolderName"] && errors["accountHolderName"] ? "border-destructive" : ""
                    }`}
                  />
                  {touchedFields["accountHolderName"] && errors["accountHolderName"] ? (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["accountHolderName"]}
                    </p>
                  ) : (
                    <p className="text-[11px] text-muted-foreground">{t.accountHolderHint}</p>
                  )}
                </div>

                {/* Account Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="accountNumber" className="text-xs font-semibold">
                    {t.accountNumberLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="accountNumber"
                    type="password"
                    value={formData.accountNumber}
                    onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value.replace(/\D/g, "") })}
                    onBlur={() => handleBlur("accountNumber")}
                    placeholder="Enter 9–18 digit account number"
                    className={`font-mono ${
                      touchedFields["accountNumber"] && errors["accountNumber"] ? "border-destructive" : ""
                    }`}
                  />
                  {touchedFields["accountNumber"] && errors["accountNumber"] && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["accountNumber"]}
                    </p>
                  )}
                </div>

                {/* Confirm Account Number */}
                <div className="space-y-1.5">
                  <Label htmlFor="confirmAccountNumber" className="text-xs font-semibold">
                    {t.confirmAccountLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="confirmAccountNumber"
                    value={formData.confirmAccountNumber}
                    onChange={(e) => setFormData({ ...formData, confirmAccountNumber: e.target.value.replace(/\D/g, "") })}
                    onBlur={() => handleBlur("confirmAccountNumber")}
                    placeholder="Re-enter bank account number"
                    className={`font-mono ${
                      touchedFields["confirmAccountNumber"] && errors["confirmAccountNumber"]
                        ? "border-destructive"
                        : ""
                    }`}
                  />
                  {touchedFields["confirmAccountNumber"] && errors["confirmAccountNumber"] && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["confirmAccountNumber"]}
                    </p>
                  )}
                </div>

                {/* IFSC Code */}
                <div className="space-y-1.5">
                  <Label htmlFor="ifscCode" className="text-xs font-semibold">
                    {t.ifscLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="ifscCode"
                    maxLength={11}
                    value={formData.ifscCode}
                    onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value.toUpperCase() })}
                    onBlur={() => handleBlur("ifscCode")}
                    placeholder="HDFC0001234"
                    className={`font-mono uppercase ${
                      touchedFields["ifscCode"] && errors["ifscCode"] ? "border-destructive" : ""
                    }`}
                  />
                  {touchedFields["ifscCode"] && errors["ifscCode"] ? (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["ifscCode"]}
                    </p>
                  ) : (
                    <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                      ✓ {formData.bankName} • {formData.branchName}
                    </p>
                  )}
                </div>

                {/* Account Type */}
                <div className="space-y-1.5">
                  <Label htmlFor="accountType" className="text-xs font-semibold">
                    {t.accountTypeLabel}
                  </Label>
                  <Select
                    value={formData.accountType}
                    onValueChange={(val) => setFormData({ ...formData, accountType: val })}
                  >
                    <SelectTrigger id="accountType">
                      <SelectValue placeholder="Account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current Account (Corporate / Commercial)</SelectItem>
                      <SelectItem value="savings">Savings Account (Sole Proprietor)</SelectItem>
                      <SelectItem value="od_cc">Cash Credit / Overdraft (CC/OD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* UPI VPA */}
                <div className="sm:col-span-2 space-y-1.5">
                  <Label htmlFor="upiId" className="text-xs font-semibold">
                    {t.upiLabel}
                  </Label>
                  <Input
                    id="upiId"
                    value={formData.upiId}
                    onChange={(e) => setFormData({ ...formData, upiId: e.target.value.toLowerCase() })}
                    placeholder="acmeindustrial@okhdfcbank"
                    className="font-mono text-xs"
                  />
                  <p className="text-[11px] text-muted-foreground">{t.upiHint}</p>
                </div>
              </div>

              {/* Upload Cheque */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <Label className="text-xs font-semibold block">{t.bankUploadLabel}</Label>
                <FileUpload
                  value={formData.bankDocuments}
                  onChange={(files) => setFormData({ ...formData, bankDocuments: files })}
                  accept=".pdf,.png,.jpg,.jpeg"
                  maxSize={5 * 1024 * 1024}
                  multiple={false}
                  label="Upload Bank Verification Proof"
                  description={t.bankUploadHint}
                />
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{t.btnBack}</span>
              </Button>
              <Button onClick={handleNext} className="gap-2 font-semibold">
                <span>{t.btnNext}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Step 4: Verification & Submit */}
        {currentStep === 3 && (
          <Card className="border-slate-200/80 dark:border-slate-800 shadow-sm">
            <CardHeader>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <div>
                  <CardTitle className="text-base sm:text-lg">{t.step4Title}</CardTitle>
                  <CardDescription className="text-xs">{t.step4Desc}</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Executive Summary Grid */}
              <div className="rounded-xl bg-slate-50 dark:bg-slate-900/80 p-4 border border-slate-200/60 dark:border-slate-800 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.summaryReviewTitle}
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Vendor Name</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.legalName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">GSTIN</span>
                    <span className="font-mono font-bold text-primary">{formData.gstin}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">PAN</span>
                    <span className="font-mono font-semibold">{formData.pan}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Settlement Bank</span>
                    <span className="font-medium">{formData.bankName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Bank Account</span>
                    <span className="font-mono">•••• •••• {formData.accountNumber.slice(-4)}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">IFSC Code</span>
                    <span className="font-mono font-semibold">{formData.ifscCode}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Uploaded Documents</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {formData.kycDocuments.length + formData.bankDocuments.length} files attached
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">UPI Routing</span>
                    <span className="font-mono">{formData.upiId || "—"}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Location</span>
                    <span>{formData.city}, {formData.state} - {formData.pincode}</span>
                  </div>
                </div>
              </div>

              {/* Statutory Declarations */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {t.declarationTitle}
                </h4>

                <div className="space-y-2.5">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="statutoryAccuracy"
                      checked={formData.confirmStatutoryAccuracy}
                      onCheckedChange={(c) =>
                        setFormData({ ...formData, confirmStatutoryAccuracy: c === true })
                      }
                    />
                    <div className="space-y-0.5">
                      <label htmlFor="statutoryAccuracy" className="text-xs font-medium leading-tight block cursor-pointer">
                        {t.declaration1}
                      </label>
                      {touchedFields["confirmStatutoryAccuracy"] && errors["confirmStatutoryAccuracy"] && (
                        <p className="text-[11px] text-destructive">{errors["confirmStatutoryAccuracy"]}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(c) => setFormData({ ...formData, agreeTerms: c === true })}
                    />
                    <div className="space-y-0.5">
                      <label htmlFor="agreeTerms" className="text-xs font-medium leading-tight block cursor-pointer">
                        {t.declaration2}
                      </label>
                      {touchedFields["agreeTerms"] && errors["agreeTerms"] && (
                        <p className="text-[11px] text-destructive">{errors["agreeTerms"]}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Authorized Signatory Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="space-y-1.5">
                  <Label htmlFor="signatoryName" className="text-xs font-semibold">
                    {t.signatoryNameLabel} <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="signatoryName"
                    value={formData.authorizedSignatoryName}
                    onChange={(e) => setFormData({ ...formData, authorizedSignatoryName: e.target.value })}
                    onBlur={() => handleBlur("signatoryName")}
                    placeholder="Full name of Director / Partner"
                    className={
                      touchedFields["authorizedSignatoryName"] && errors["authorizedSignatoryName"]
                        ? "border-destructive"
                        : ""
                    }
                  />
                  {touchedFields["authorizedSignatoryName"] && errors["authorizedSignatoryName"] && (
                    <p className="text-[11px] text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0" /> {errors["authorizedSignatoryName"]}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="signatoryDesignation" className="text-xs font-semibold">
                    {t.signatoryDesignationLabel}
                  </Label>
                  <Input
                    id="signatoryDesignation"
                    value={formData.authorizedSignatoryDesignation}
                    onChange={(e) => setFormData({ ...formData, authorizedSignatoryDesignation: e.target.value })}
                    placeholder="e.g. Director, Partner, Proprietor"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <Button variant="outline" size="sm" onClick={handleBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                <span>{t.btnBack}</span>
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 shadow-sm"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin mr-1" />
                    <span>Submitting KYC...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t.btnSubmit}</span>
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Submission Success Dialog */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader className="text-center sm:text-center items-center">
            <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-2 animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <DialogTitle className="text-lg font-bold">{t.modalTitle}</DialogTitle>
            <DialogDescription className="text-xs text-muted-foreground mt-1">
              {t.modalDesc}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 my-3">
            {/* Registration ID Badge Box */}
            <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  {t.appIdLabel}
                </span>
                <span className="font-mono text-sm font-extrabold text-primary">
                  {applicationId}
                </span>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={handleCopyId}
                className="h-7 px-2.5 text-xs gap-1"
                aria-label="Copy Vendor Application ID"
              >
                {copiedId ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId ? "Copied" : "Copy"}</span>
              </Button>
            </div>

            {/* Verification SLA card */}
            <div className="rounded-lg border border-slate-200/80 dark:border-slate-800 p-3 space-y-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">{t.slaLabel}:</span>
                <span className="font-semibold text-foreground">{t.slaValue}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Audit Status:</span>
                <StatusBadge status="PENDING" label={t.statusBadgeLabel} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Target GSTIN:</span>
                <span className="font-mono text-xs">{formData.gstin}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-center">
            <Button
              className="w-full font-semibold"
              onClick={() => {
                setShowSuccessModal(false);
                handleResetForm();
              }}
            >
              {t.btnDone}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
