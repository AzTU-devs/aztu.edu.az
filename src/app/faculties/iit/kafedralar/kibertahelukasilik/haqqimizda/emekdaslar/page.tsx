"use client";

import SectionBlock from "@/components/shared/SectionBlock";
import PersonCard from "@/components/shared/PersonCard";

export default function EmekdaslarPage() {
  const employees = [
    { fullName: "Qasımlı Fərid Fikrət oğlu", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "farid.gasimli@aztu.edu.az", phone: "+994 50-403-07-44" },
    { fullName: "Məhərrəmova Aynur Natiq", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aynur.meherremova@aztu.edu.az", phone: "+994 51-700-30-30" },
    { fullName: "Məmmədova Nərmin Ləyaqət", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "narmin.mammadova@aztu.edu.az", phone: "+994 51-526-86-87" },
    { fullName: "Qəhrəmanova Samirə Həsən", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "t.f.d., dosent", email: "samira.qahramanova@aztu.edu.az", phone: "+994 10 527 07 11" },
    { fullName: "Babayeva Arzu Ələm", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "arzu.babayeva@aztu.edu.az", phone: "+994 51-430-05-74" },
    { fullName: "Hüseynova Əzimə Şahin", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ezime.huseynova@aztu.edu.az", phone: "+994 51-649-82-98" },
    { fullName: "Qəhrəmanova İlahə Həsən", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "ilaha.qahramanova@aztu.edu.az", phone: "+994 50-418-57-30" },
    { fullName: "İbrahimova Aytəkin Bəybala", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aytekin.ibrahimova@aztu.edu.az", phone: "+994 55-980-39-70" },
    { fullName: "Əliyeva Qahirə Tehran", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "qahire.vahidli@aztu.edu.az", phone: "+994 55-840-97-28" },
    { fullName: "Quluzadə Pərişan Ceyhun", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "perishan.guluzade@aztu.edu.az", phone: "+994 50-449-30-56" },
    { fullName: "Nəcəfli Cavad Vaqif", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "cavad.necefli@aztu.edu.az", phone: "+994 51-340-19-24" },
    { fullName: "Arifli Aydan Rauf", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "aydan.arifli@aztu.edu.az", phone: "+994 55-439-72-28" },
    { fullName: "Orucova Leyla Sənan", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "leyla.orucova@aztu.edu.az", phone: "+994 50-679-72-34" },
    { fullName: "Şirəliyeva Xumar Rəşad", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "khumar.shiraliyeva@aztu.edu.az", phone: "+994 55-232-07-67" },
    { fullName: "Abdullayeva Inci Tağı", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "inci.abdullayeva@aztu.edu.az", phone: "+994 50-536-49-26" },
    { fullName: "Fərzəliyev Azad Novruz", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "azad.farzaliyev@aztu.edu.az", phone: "+994 51-696-06-44" },
    { fullName: "Səfərli Ramidə Elşən", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ramida.safarli@aztu.edu.az", phone: "+994 55-329-83-26" },
    { fullName: "Kərimova Adilə Yadigar", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "adila.karimova@aztu.edu.az", phone: "+994 51-821-54-17" },
    { fullName: "Ağababayev Rahib Rəsul", title: "Kibertəhlükəsizlik kafedrasının baş müəllimi", academicDegree: "Yoxdur", email: "rahib.agababayev@aztu.edu.az", phone: "+994 51-491-91-81" },
    { fullName: "Quliyev Natiq Əliabbas", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "f.r.e.n., dosent", email: "natiq.quliyev@aztu.edu.az", phone: "+994 70-323-37-36" },
    { fullName: "Sadıqova Rəhilə Hidayət", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "r.ü.f.d., dosent", email: "rahila.sadygova@aztu.edu.az", phone: "+994 70-623-31-18" },
    { fullName: "Hüseynov Aydın Fridun", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "t.e.n., dosent", email: "aydin.huseynov@aztu.edu.az", phone: "+994 70-386-76-77" },
    { fullName: "Əliyev Əli Əbülfəz", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "ali.aliyev@aztu.edu.az", phone: "+994 50-253-49-53" },
    { fullName: "Məmmədzadə Nigar Ərəstun", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "nigar.mammadzade@aztu.edu.az", phone: "+994 50-493-21-24" },
    { fullName: "İbayev Elşən Akif", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "r.ü.f.d., dosent", email: "elshen.ibayev@aztu.edu.az", phone: "+994 50-501-14-84" },
    { fullName: "Abbasova Əminə Elşad", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "amina.abbasova@aztu.edu.az", phone: "+994 51-724-60-92" },
    { fullName: "Həsənova Samirə Əfrasiyab", title: "Kibertəhlükəsizlik kafedrasının assistenti", academicDegree: "Yoxdur", email: "samirahasanova75@gmail.com", phone: "+994 50-349-77-27" },
    { fullName: "Cəfərov Təbriz Ramal", title: "Kibertəhlükəsizlik kafedrasının dosenti", academicDegree: "h.ü.f.d., dosent", email: "tabriz.cafarov@aztu.edu.az", phone: "+994 50-247-48-10" },
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
              phone={emp.phone}
              size="sm"
            />
          ))}
        </div>
      </SectionBlock>
    </div>
  );
}
