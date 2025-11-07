"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { BusinessLogo, InterviewBg, thirdOrange } from "@/public";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Phone,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import Footer from "./Footer";

const TermsSection = () => {
  return (
    <section className="relative  bg-black text-white overflow-hidden">
      {/* Background Image */}

      {/* Navbar */}
      <Navbar />

      <section>
        <div className="absolute -top-250 w-full h-full">
          <Image
            src={thirdOrange}
            alt="Third section banner"
            fill
            className="object-contain h-[50%] lg:h-fit"
            priority
          />
        </div>

        <section
          className="relative z-10 w-[1000px] top-20 mx-auto mt-24 mb-32 p-6 sm:p-10 md:p-16 
        bg-orange-500/3 border border-white/10 backdrop-blur-2xl glow-orange2 rounded-2xl shadow-[0_0_40px_rgba(232,96,46,0.1)] 
        leading-relaxed text-[15px] sm:text-base"
        >
        
          <h1 className="text-[36px] md:text-[55px] lg:text-[73px] pb-[15px] md:pb-[30px] lg:pb-[40px]">Terms of use</h1>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Definitions</h1>
            <p>
              The term “thebusinessinsight.com” (referred to herein as the
              “Website”) pertains to an online service operated and supplied by
              The Business Insight (referred to herein as the “Company”). The
              Website encompasses services and content provided by the Company.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Introduction</h1>
            <p>
              These stipulations regulate your utilization of this Website. By
              accessing and using this Website, you acknowledge your acceptance
              of these terms and conditions in their entirety. If you disagree
              with any part of these terms and conditions, refrain from using
              this Website.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Cookie usage</h1>
            <p>
              This Website employs cookies. By accessing and using this Website
              while agreeing to these terms and conditions, you provide consent
              to the Company’s use of cookies, in accordance with the Company’s
              privacy policy/cookies policy.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Website Usage License</h1>
            <p>
              Unless explicitly stated otherwise, the Company and/or its
              licensors retain intellectual property rights concerning the
              Website and the materials present on it. Subject to the license
              conditions outlined below, these intellectual property rights are
              reserved.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">You're allowed to:</h1>
            <li>
              <li>
                View, download (for caching purposes only), and print pages or
                other content from the Website for personal use, adhering to the
                limitations stipulated below and in other sections of these
                terms and conditions.
              </li>
            </li>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">You must not:</h1>
            <li>
              <li>
                Republish material from this Website, including reposting it on
                another Website.
              </li>
              <li>Sell, rent, or sub-license material from the Website.</li>
              <li>Display any material from the Website in public.</li>
              <li>
                Exploit material from this Website for commercial purposes by
                reproducing, duplicating, copying, or any other means.
              </li>
              <li>Edit or modify material on the Website.</li>
              <li>
                Redistribute material from this Website, except for content
                explicitly and expressly designated for redistribution.
              </li>
            </li>
            <p>
              Content designed for redistribution may only be redistributed
              within your organization.
            </p>
          </div>
          <div className="font-sans">
            <h2 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Acceptable Usage:</h2>
            <p>
              You must refrain from using this Website in any manner that could
              cause damage to the Website, impair its availability or
              accessibility, or engage in any unlawful, illegal, fraudulent, or
              harmful activities. This includes using the Website for copying,
              storing, hosting, transmitting, sending, publishing, or
              distributing material linked to spyware, computer viruses, Trojan
              horses, worms, keystroke loggers, rootkits, or any other malicious
              computer software.
            </p>
            <p>
              Engaging in systematic or automated data collection activities
              (such as scraping, data mining, data extraction, and data
              harvesting) related to this Website without the Company’s explicit
              written consent is prohibited. Similarly, using this Website for
              marketing purposes without the Company’s express written consent
              is disallowed.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">No Warranties</h1>
            <p>
              This Website is provided “as is,” without any express or implied
              representations or warranties. The Company does not make any
              representations or warranties concerning this Website or the
              information and materials presented on it. The Company does not
              guarantee that:
            </p>
            <li>
              <li className="decoration-dotted">
                This Website will be consistently available or available at all.
              </li>
              <li>
                The information on this Website is complete, accurate, true, or
                not misleading.
              </li>
            </li>
            <p>
              Nothing on this Website constitutes or should be interpreted as
              advice of any kind. For advice regarding legal or financial
              matters, it is recommended to consult an appropriate professional.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Limitations of Liability</h1>
            <p>
              The Company will not be held liable to you (whether under contract
              law, tort law, or otherwise) concerning the contents of, usage of,
              or any other connection to this Website:
            </p>
            <li>
              <li>
                For direct loss to the extent the Website is provided without
                charge.
              </li>
              <li>For indirect, special, or consequential loss.</li>
              <li>
                For business losses, loss of income, revenue, profits, or
                anticipated savings; loss of contracts or business
                relationships; loss of reputation or goodwill; or loss or
                corruption of data or information.
              </li>
            </li>
            <p>
              These limitations of liability apply even if the Company has been
              advised of the potential loss.
            </p>
          </div>
          <div className="font-sans">
            <p className="text-[18px] md:text-[22px] lg:text-[25px] pb-[3px] lg:pb-[9px]">Exceptions</p>
            <p>
              Nothing in this Website disclaimer is meant to exclude or limit
              any implied warranty mandated by law, nor to exclude or limit the
              Company’s liability for:
            </p>
            <li>
              <li>
                Death or personal injury resulting from the Company’s
                negligence.
              </li>
              <li>
                Fraud or fraudulent misrepresentation on the part of the
                Company.
              </li>
              <li>
                Matters for which it is unlawful or illegal for the Company to
                exclude or limit liability.
              </li>
            </li>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Reasonableness:</h1>
            <p>
              Through the utilization of this Website, you acknowledge that the
              exclusions and limitations of liability specified in this Website
              disclaimer are rational. If you find these terms unreasonable, you
              must refrain from using this Website.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Involvement of Other Parties:</h1>
            <p>
              You recognize that, as a limited liability entity, the Company has
              a vested interest in restricting the personal liability of its
              officers and employees. Consequently, you agree not to hold the
              Company’s officers or employees personally liable for any losses
              you incur in connection with the Website.
            </p>
            <p>
              Furthermore, the limitations of warranties and liability outlined
              in this Website disclaimer extend protection to the Company’s
              officers, employees, agents, subsidiaries, successors, assigns,
              and subcontractors.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Unenforceable Provisions:</h1>
            <p>
              In the event that any provision of this Website disclaimer is
              deemed unenforceable under applicable law, the enforceability of
              the remaining provisions shall not be affected. If any provision
              would be enforceable if a part of it were removed, that part shall
              be deemed deleted while the remainder continues to be valid.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Indemnification:</h1>
            <p>
              You hereby agree to indemnify the Company and commit to indemnify
              the Company against any losses, damages, costs, liabilities, and
              expenses (including legal fees and any amounts paid by the Company
              to a third party as part of a claim or dispute, based on advice
              from the Company’s legal advisors) incurred or suffered by the
              Company due to your violation of any provision within these terms
              and conditions. This includes claims that you breached any
              provision of these terms and conditions.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Account Access:</h1>
            <p>
              Certain features of this Website might necessitate your
              registration. The Company may assign a password and username or
              account identification to you, or you may be required to select
              them. By registering, you agree to furnish accurate and complete
              registration information. You are responsible for safeguarding the
              security and confidentiality of your password and identification.
              You are required to notify the Company immediately of any
              unauthorized use or breach of this Website’s security linked to
              your password or identification. Any use of your password or
              identification is considered authorized, and you will be held
              accountable for all access and use, including any obligations
              incurred through such use.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Purchases on the Website:</h1>
            <p>
              Transactions through this Website may be conducted electronically
              from start to finish at the Company’s discretion. If
              non-electronic procedures are chosen, these transactions will
              still be governed by these Terms unless the Company provides
              alternative terms. You are responsible for retaining a copy of
              these Terms and any other contract or disclosure that the Company
              must provide. Upon delivery to the carrier, the risk of loss and
              title for items purchased passes to you according to a shipment
              contract. If the Company ships to you or to another individual per
              your instructions, you agree to bear the shipping and handling
              charges indicated on this Website when placing an order. The
              Company reserves the right to modify, eliminate, or add charges
              without prior notice. Any shipping or handling charges may not
              necessarily mirror actual costs. Only authorized credit cards or
              other acceptable payment methods may be used. Upon submitting your
              order, you confirm that you are authorized to use the designated
              method and authorize the Company to charge your order to that
              method. If the method cannot be verified, is invalid, or is
              otherwise unacceptable, your order may be suspended or canceled
              automatically. Any errors on this Website, in an order
              confirmation, during order processing, product delivery, or in any
              other context may be corrected by the Company. This includes
              revising your order (including adjusting the price) or canceling
              the order and issuing a refund. Your sole recourse in case of such
              an error is to cancel your order and receive a refund.
              Availability of items is subject to change, and the Company can
              impose quantity limits on orders, reject orders (partially or
              fully), and discontinue products or services without prior
              notification, even if an order has already been placed. Prices are
              subject to change without notice. The Company reserves the right
              to refuse or cancel orders if the sale or use of products or
              services is restricted or prohibited in your jurisdiction.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Links:</h1>
            <p>
              This Website may contain links to third-party websites on the
              internet, owned and operated by entities other than the Company.
              You acknowledge that the Company is not responsible for the
              operation or content of any such third-party websites
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Termination:</h1>
            <p>
              You can terminate these Terms at any time by closing your account,
              discontinuing your use of this Website, and informing the Company
              of your termination. The Company reserves the right to terminate
              your access to this Website, either partially or entirely, and to
              block or prevent your future access without prior notice and at
              its sole discretion.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Breach of Terms and Conditions:</h1>
            <p>
              Without prejudice to the Company’s other rights outlined in these
              terms and conditions, if you breach these terms and conditions in
              any manner, the Company may take appropriate action to address the
              breach. This may involve suspending your access, preventing
              access, blocking computers using your IP address, or pursuing
              legal action.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Variation:</h1>
            <p>
              The Company may revise these terms and conditions periodically.
              The revised terms and conditions will apply to your use of this
              Website from the date they are published here. Regularly checking
              this page is advisable to ensure familiarity with the current
              version.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Assignment:</h1>
            <p>
              The Company may transfer, subcontract, or otherwise manage its
              rights and obligations under these terms and conditions without
              notifying or obtaining your consent. However, you are not
              permitted to transfer, subcontract, or otherwise manage your
              rights and obligations under these terms and conditions.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Severability:</h1>
            <p>
              If a provision of these terms and conditions is deemed unlawful or
              unenforceable by a court or competent authority, the remaining
              provisions will continue to apply. If an unlawful or unenforceable
              provision could be lawful or enforceable if a portion were
              deleted, that portion shall be considered deleted, and the rest of
              the provision will remain in effect.
            </p>
          </div>
          <div className="font-sans">
            <h1 className="text-[22px] md:text-[30px] lg:text-[35px] pb-[3px] lg:pb-[9px]">Entire Agreement:</h1>
            <p>
              These terms and conditions constitute the entire agreement between
              you and the Company regarding your use of this Website,
              superseding any previous agreements related to its use.
            </p>
          </div>
        </section>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-30 right-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute bottom-0 left-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute top-420 -right-150 w-[1200px] h-[1200px] 
  bg-[radial-gradient(circle_at_left_bottom,_rgba(232,96,46,0.55),_transparent_70%)] 
  blur-3xl pointer-events-none z-0"
        />
      </section>
      <Footer />
    </section>
  );
};

export default TermsSection;
