import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "البريد الالكتروني مطلوب",
  }),
  password: z.string().min(1, {
    message: "كلمة المرور مطلوبة",
  }),
});

export const RegisterSchema = z
  .object({
    FirstName: z
      .string({
        message: "الاسم مطلوب",
      })
      .min(1, {
        message: "الاسم مطلوب",
      }),
    FatherName: z
      .string({
        message: "اسم الاب مطلوب",
      })
      .min(1, {
        message: "اسم الاب مطلوب",
      }),
    GrandFatherName: z
      .string({
        message: "اسم الجد مطلوب",
      })
      .min(1, {
        message: "اسم الجد مطلوب",
      }),
    FamilyName: z
      .string({
        message: "اسم العائلة مطلوب",
      })
      .min(1, {
        message: "اسم العائلة مطلوب",
      }),
    username: z
      .string({
        message: "اسم المستخدم مطلوب",
      })
      .min(1, {
        message: "اسم المستخدم مطلوب",
      })
      .toLowerCase(),
    email: z.string().email({
      message: "البريد الالكتروني مطلوب",
    }),
    NationalID: z
      .string()
      .min(10, {
        message: "الرقم الوطني يجب أن يتكون من 10 ارقام",
      })
      .max(11, {
        message: "الرقم الوطني يجب ألا يتجاوز 11 رقمًا",
      })
      .regex(/^\d+$/, {
        message: "الرقم الوطني يجب أن يتكون من أرقام فقط",
      }),
    BDate: z
      .date({
        message: "تاريخ الميلاد مطلوب",
      })
      .refine((date) => date < new Date(), {
        message: "تاريخ الميلاد يجب أن يكون في الماضي",
      }),
    MobileNumber: z
      .string()
      .min(9, {
        message: "رقم الهاتف يجب أن يتكون من 10 ارقام",
      })
      .max(15, {
        message: "رقم الهاتف يجب ألا يتجاوز 15 رقمًا",
      })
      .regex(/^\+?[0-9]\d{1,14}$/, {
        message: "صيغة رقم الهاتف غير صحيحة",
      }),
    role: z.enum(["USER", "ADMIN", "SUPERVISOR"]).default("USER"),
    password: z.string().min(6, {
      message: "الطول 6 حروف على الاقل",
    }),
    confirmPassword: z.string().min(6, {
      message: "الطول 6 حروف على الاقل",
    }),
     swiftCode: z
      .string()
       .length(8, {
       message: "رمز SWIFT يجب أن يكون 8 أحرف",
       }),
       accountId: z
       .string({
       message: "  رقم الحساب النكي مطلوب",
       })
       .min(1, {
         message: "   رقم الحساب البنكي مطلوب",
       }),
       IBAN: z
       .string()
       .length(30, {
        message: "رقم IBAN يجب أن يكون 30 حرفًا",
       }),
       bankName: z
       .string({
         message: "اسم البنك مطلوب",
       })
       .min(1, {
         message: "اسم البنك مطلوب",
       }),

  }).refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "كلمة المرور وتأكيد كلمة المرور غير متطابقين",
  });

export const EventsSchema = z
  .object({
    name: z.string().min(1, "اسم الحدث مطلوب"),
    StartDate: z
      .date({
        required_error: "تاريخ البدء مطلوب",
      })
      .refine((date) => date > new Date(), {
        message: "تاريخ البدء يجب أن يكون في المستقبل",
      }),
    EndDate: z
      .date({
        required_error: "تاريخ الانتهاء مطلوب",
      })
      .refine((date) => date > new Date(), {
        message: "تاريخ الانتهاء يجب أن يكون في المستقبل",
      }),
  })
  .superRefine((data, ctx) => {
    if (data.EndDate <= data.StartDate) {
      ctx.addIssue({
        code: "custom",
        path: ["EndDate"],
        message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء",
      });
    }
  });

export const camelSchema = z.object({
  name: z.string().min(1, "Name is required"),
  camelID: z.coerce.number().min(1, "Camel ID is required"),
  age: z.enum(
    [
      "GradeOne",
      "GradeTwo",
      "GradeThree",
      "GradeFour",
      "GradeFive",
      "GradeSixMale",
      "GradeSixFemale",
    ],
    {
      invalid_type_error: "Invalid age",
    }
  ),
  sex: z.enum(["Male", "Female"], {
    invalid_type_error: "Invalid sex",
  }),
  ownerId: z.string().min(1),
});

export const createLoopSchema = z
  .object({
    capacity: z.number().min(1),
    age: z.enum([
      "GradeOne",
      "GradeTwo",
      "GradeThree",
      "GradeFour",
      "GradeFive",
      "GradeSixMale",
      "GradeSixFemale",
    ]),
    sex: z.enum(["Male", "Female"]),
    time: z
      .enum(["Morning", "Evening", "صباحي", "مسائي"])
      .transform((val) =>
        val === "صباحي" ? "Morning" : val === "مسائي" ? "Evening" : val
      ),
    startRegister: z.string().transform((str) => new Date(str)),
    endRegister: z.string().transform((str) => new Date(str)),
  })
  .superRefine((data, ctx) => {
    if (data.endRegister <= data.startRegister) {
      ctx.addIssue({
        code: "custom",
        path: ["EndDate"],
        message: "تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء",
      });
    }
  });

export const registerCamelSchema = z.object({
  camelId: z.coerce.number().min(1),
  loopId: z.string().min(1),
});
