import bcrypt from "bcrypt";
import db from "../db/db";

async function hashPasswords() {
  try {
    const [users] = await db.query("SELECT user_id, password FROM users");

    for (const user of users as any[]) {
      const currentPassword = user.password;

      // Salta se già hashata
      if (currentPassword.startsWith("$2") && currentPassword.length >= 60) {
        console.log(`Utente ${user.user_id} già hashato. Skippato.`);
        continue;
      }

      const hashed = await bcrypt.hash(currentPassword, 10);

      await db.query("UPDATE users SET password = ? WHERE user_id = ?", [
        hashed,
        user.user_id,
      ]);

      console.log(`✅ Password aggiornata per utente ID ${user.user_id}`);
    }

    console.log("🎉 Tutte le password sono state hashate.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Errore durante la migrazione:", error);
    process.exit(1);
  }
}

// Esegui se chiamato direttamente
if (require.main === module) {
  hashPasswords();
}
