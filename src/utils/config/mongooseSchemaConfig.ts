// mongooseSchemaConfig.js
export const mongooseSchemaConfig = {
    id: true,
    versionKey: false,
    timestamps: true,
    autoIndex: true,
    toJSON: {
      virtuals: true,
      transform: (_:any, ret:any) => {
        // Remove sensitive and unnecessary fields before sending data to the frontend
        delete ret._id;
        delete ret.password;
        delete ret.salt;
        delete ret.visible;
        delete ret.updatedAt;
        delete ret.code;
        delete ret.secretQuestions;
        return ret;
      },
    },
    toObject: {
      virtuals: true,
      transform: (_:any, ret:any) => {
        delete ret._id;
        delete ret.password;
        delete ret.salt;
        delete ret.visible;
        delete ret.updatedAt;
        delete ret.code;
        delete ret.secretQuestions;
        return ret;
      },
    },
  };
  