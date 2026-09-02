"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";

export default function EmekdaslarPage() {
  const employees = [
    { fullName: "Qasımlı Fərid Fikrət oğlu", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "farid.gasimli@aztu.edu.az", phone: "" },
    { fullName: "Məhərrəmova Aynur Natiq", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aynur.meherremova@aztu.edu.az", phone: "" },
    { fullName: "Məmmədova Nərmin Ləyaqət", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "narmin.mammadova@aztu.edu.az", phone: "" },
    { fullName: "Qəhrəmanova Samirə Həsən", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "t.f.d., dosent", email: "samira.qahramanova@aztu.edu.az", phone: "" },
    { fullName: "Babayeva Arzu Ələm", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "arzu.babayeva@aztu.edu.az", phone: "" },
    { fullName: "Hüseynova Əzimə Şahin", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ezime.huseynova@aztu.edu.az", phone: "" },
    { fullName: "Qəhrəmanova İlahə Həsən", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "ilaha.qahramanova@aztu.edu.az", phone: "" },
    { fullName: "İbrahimova Aytəkin Bəybala", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aytekin.ibrahimova@aztu.edu.az", phone: "" },
    { fullName: "Əliyeva Qahirə Tehran", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "qahire.vahidli@aztu.edu.az", phone: "" },
    { fullName: "Quluzadə Pərişan Ceyhun", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "perishan.guluzade@aztu.edu.az", phone: "" },
    { fullName: "Nəcəfli Cavad Vaqif", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "cavad.necefli@aztu.edu.az", phone: "" },
    { fullName: "Arifli Aydan Rauf", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aydan.arifli@aztu.edu.az", phone: "" },
    { fullName: "Orucova Leyla Sənan", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "leyla.orucova@aztu.edu.az", phone: "" },
    { fullName: "Şirəliyeva Xumar Rəşad", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "khumar.shiraliyeva@aztu.edu.az", phone: "" },
    { fullName: "Abdullayeva Inci Tağı", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "inci.abdullayeva@aztu.edu.az", phone: "" },
    { fullName: "Fərzəliyev Azad Novruz", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "azad.farzaliyev@aztu.edu.az", phone: "" },
    { fullName: "Səfərli Ramidə Elşən", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ramida.safarli@aztu.edu.az", phone: "" },
    { fullName: "Kərimova Adilə Yadigar", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "adila.karimova@aztu.edu.az", phone: "" },
    { fullName: "Ağababayev Rahib Rəsul", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "rahib.agababayev@aztu.edu.az", phone: "" },
    { fullName: "Quliyev Natiq Əliabbas", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "f.r.e.n., dosent", email: "natiq.quliyev@aztu.edu.az", phone: "" },
    { fullName: "Sadıqova Rəhilə Hidayət", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "r.ü.f.d., dosent", email: "rahila.sadygova@aztu.edu.az", phone: "" },
    { fullName: "Hüseynov Aydın Fridun", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "t.e.n., dosent", email: "aydin.huseynov@aztu.edu.az", phone: "" },
    { fullName: "Əliyev Əli Əbülfəz", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ali.aliyev@aztu.edu.az", phone: "" },
    { fullName: "Məmmədzadə Nigar Ərəstun", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "nigar.mammadzade@aztu.edu.az", phone: "" },
    { fullName: "İbayev Elşən Akif", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "r.ü.f.d., dosent", email: "elshen.ibayev@aztu.edu.az", phone: "" },
    { fullName: "Abbasova Əminə Elşad", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "amina.abbasova@aztu.edu.az", phone: "" },
    { fullName: "Həsənova Samirə Əfrasiyab", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "samirahasanova75@gmail.com", phone: "" },
    { fullName: "Cəfərov Təbriz Ramal", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "h.ü.f.d., dosent", email: "tabriz.cafarov@aztu.edu.az", phone: "" },
  ];

  return (
    <div className="space-y-6">
      <SectionBlock title="Əməkdaşlar" accent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp, i) => (
            <PersonCard
              key={i}
              fullName={emp.fullName}
              title={emp.title}
              academicDegree={emp.academicDegree === "Yoxdur" ? undefined : emp.academicDegree}
              email={emp.email}
              size="sm"
            />
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
