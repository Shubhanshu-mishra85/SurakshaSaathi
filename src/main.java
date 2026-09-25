import java.util.Scanner;

public class Main {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("================================");
        System.out.println("      SURAKSHASAATHI");
        System.out.println("   Digital Safety Assistant");
        System.out.println("================================");

        System.out.println();
        System.out.println("Enter a suspicious message:");
        
        String message = sc.nextLine().toLowerCase();

        int riskScore = 0;

        // Check for suspicious words
        if (message.contains("otp")) {
            riskScore += 2;
        }

        if (message.contains("password")) {
            riskScore += 2;
        }

        if (message.contains("urgent")) {
            riskScore += 2;
        }

        if (message.contains("account blocked")) {
            riskScore += 3;
        }

        if (message.contains("click")) {
            riskScore += 2;
        }

        if (message.contains("verify")) {
            riskScore += 1;
        }

        if (message.contains("prize")) {
            riskScore += 2;
        }

        if (message.contains("winner")) {
            riskScore += 2;
        }

        System.out.println();
        System.out.println("Risk Score: " + riskScore);

        // Final result
        if (riskScore >= 5) {

            System.out.println("🔴 POTENTIAL SCAM");
            System.out.println();
            System.out.println("Why?");
            System.out.println("Suspicious patterns were detected.");
            System.out.println();
            System.out.println("Safety Advice:");
            System.out.println("• Do not click unknown links.");
            System.out.println("• Do not share OTP or password.");
            System.out.println("• Verify through an official source.");

        } else if (riskScore >= 2) {

            System.out.println("🟡 CAUTION");
            System.out.println();
            System.out.println("This message contains some warning signs.");
            System.out.println("Verify the information before taking action.");

        } else {

            System.out.println("🟢 NO MAJOR WARNING SIGNAL DETECTED");
            System.out.println();
            System.out.println("Still verify important requests through official channels.");
        }

        sc.close();
    }
}
