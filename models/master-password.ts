import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT = 10;

interface IMasterPassword extends mongoose.Document {
  password: string;
  previousPasswords: string[];
  comparePassword(candidate: string): Promise<boolean>;
  createdAt?: Date;
  updatedAt?: Date;
}


const masterPasswordSchema = new mongoose.Schema<IMasterPassword>({
  password: { type: String, required: true },
  previousPasswords: { type: [String], default: [] },
},
  {
    timestamps: true
  }
);

// Hash password before saving
masterPasswordSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  if (this.password) {
    this.previousPasswords.push(this.password);
  }

  const salt = await bcrypt.genSalt(SALT);
  this.password = await bcrypt.hash(this.password, salt);
});

// Hash password before updating
masterPasswordSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate() as { password?: string };

  if (!update?.password) return;

  const salt = await bcrypt.genSalt(SALT);
  update.password = await bcrypt.hash(update.password, salt);

  this.setUpdate(update);
});

// Compare password method
masterPasswordSchema.methods.comparePassword = async function (masterPassword: string): Promise<boolean> {
  return bcrypt.compare(masterPassword, this.password);
};

const MasterPassword =
  mongoose.models.MasterPassword ||
  mongoose.model<IMasterPassword>("MasterPassword", masterPasswordSchema);

export default MasterPassword;