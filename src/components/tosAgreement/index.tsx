import { FC } from 'react';
import styled from 'styled-components';
import { sharedDb } from '@/src/db/shared';
import { Button } from '../button';
import { Heading } from '../generic/heading';
import { ListItem } from './ListItem';

export const TosAgreement: FC = () => {
  const onAccept = async () => {
    await sharedDb.setKeyVal('isTosInAgreement', true);
    window.location.reload();
  };

  return (
    <Wrapper>
      <Heading>TAAL WALLET LIMITED LICENSE AGREEMENT</Heading>
      <ListItem num="1." as="h2">
        Introduction
      </ListItem>
      <p>
        This limited license agreement (the <strong>“Agreement”</strong>) between Taal DIT GmbH (herein
        referred to as <strong>“Taal”</strong>, <strong>“we”</strong>, <strong>“us”</strong> or{' '}
        <strong>“our”</strong>) and you (referred to in this Agreement as <strong>“Licensee”</strong>, “you”,
        or “your” and collectively with Taal the “Parties”), applies to your use of TAAL Wallet (as defined in
        Section 2.1 below). This Agreement sets out the limited license we are granting you to use TAAL
        Wallet. If you download and use the TAAL Wallet, you agree to be bound by this Agreement and the other
        terms published from time to time by us. If you do not agree to be so bound{' '}
        <strong>YOU MAY NOT USE THE TAAL WALLET</strong>.
      </p>
      <ListItem as="h2" num="2.">
        Definitions
      </ListItem>
      <ListItem num="2.1." as="div" isBlock>
        <p>
          In this Agreement and its recitals and Schedules hereto the following words shall, when used as
          capitalised terms, bear the following meanings:
        </p>
        <p>
          <strong>“Agreement”</strong> means this limited license agreement, including its appendixes and any
          amendments to them as may be published by Taal from time to time.
        </p>
        <p>
          <strong>“Data Protection Law”</strong> means any present or future Laws or regulations, or guidance
          or codes of practice issued by an applicable regulator, relating to data privacy, data security, or
          the use or processing of data relating to natural persons.
        </p>
        <p>
          <strong>“Documentation”</strong> means the user documentation made available by Taal in connection
          with the TAAL Wallet and its underlying technology as set forth in further detail in <u>Annex 1</u>.
        </p>
        <p>
          <strong>“Laws”</strong> means all applicable laws, statutes, judicial decrees, regulations,
          administrative rules, guidelines and agency staff reports, and any other requirements issued by a
          governmental organization (including a transnational governmental organization).
        </p>
        <p>
          <strong>“TAAL Wallet"</strong> means the wallet software made available by Taal to Licensee as
          further defined in the Documentation in <u>Annex 1</u>
        </p>
      </ListItem>
      <ListItem as="h2" num="3.">
        License Grant
      </ListItem>
      <p>
        During the term of this Agreement and subject to the terms and conditions of this Agreement, Taal
        hereby grants to Licensee a worldwide, revocable, non-exclusive, non-assignable, non-transferable,
        non-sub-licensable license to download and use the TAAL Wallet for any commercial and non-commercial
        use.
      </p>
      <ListItem as="h2" num="4.">
        Your Representations and Covenants to Taal
      </ListItem>
      <ListItem num="4.1.">
        Licensee shall at all times be in good standing in each jurisdiction in which it is formed or
        operates, and shall comply with all applicable Laws of your and your end users, customers and clients
        jurisdictions of formation or operation.
      </ListItem>
      <ListItem num="4.2.">
        Licensee represents and warrants that it (i) will comply with all applicable Laws in all jurisdictions
        in which you or your end users, customers and clients are formed or operate, including without
        limitation Laws relating to privacy, Data Protection Laws, securities, anti-money laundering,
        terrorism financing, and sanctions, and (ii) will be responsible for your end users, customers and
        clients compliance with all such applicable Laws.
      </ListItem>
      <ListItem num="4.3.">
        The Licensee will not use the TAAL Wallet in connection with any activities that are illegal in your
        jurisdictions of formation and operation, including without limitation drug trafficking, pornography,
        arms dealing, environmental crimes, money laundering, terrorism, sanctions circumvention, human
        trafficking, smuggling, or extortion.
      </ListItem>
      <ListItem num="4.4.">
        Licensee shall at all times comply with Taal’s Code of Conduct and Business Ethics Policy, as well as
        its Anti-Bribery and Corruption Policy.
      </ListItem>
      <ListItem num="4.5.">
        Taal is authorized to monitor compliance with the requirements of this Section 4 by Licensee and is
        entitled to request information on the fulfilment of such requirements at any time. In addition to any
        other remedy available to Taal, non-compliance with any term of this Agreement entitles Taal to
        suspend or terminate this Agreement with immediate effect.
      </ListItem>
      <ListItem as="h2" num="5.">
        Rights of Ownership and Back License
      </ListItem>
      <ListItem num="5.1">
        Taal retains all right, title, and interest in and to the TAAL Wallet, Documentation, any other
        information or materials made available to Licensee, and all modifications, enhancements and
        derivatives thereof (collectively, “Licensor Materials”), excluding Licensee Modifications (as defined
        in Section 5.2 below).
      </ListItem>
      <ListItem num="5.2">
        Licensee shall own all modifications, enhancements and derivatives of the TAAL Wallet made by or on
        behalf of Licensee (“Licensee Modifications”), provided, however, that Licensee may not restrict any
        further developments of the TAAL Wallet.
      </ListItem>
      <ListItem num="5.3">
        Licensee hereby grants a worldwide, non-exclusive, royalty-free, irrevocable, perpetual, freely
        assignable and sub-licensable license to Taal and its sub-licensees to copy, edit, modify, translate,
        include in a compilation or collective work, publicly display, perform, distribute, broadcast, offer
        for download, stream, publish or otherwise use all Licensee Modifications. Taal agrees to use this
        limited license in the Licensee Modifications for purpose of maintaining interoperability for all
        users of the TAAL Wallet; provided that Taal shall own all right, title, and interest in and to all
        modifications, enhancements, and derivatives of the Licensee Modifications made by or on behalf of
        Taal. This allows builders on the Taal ecosystem to commercialize their innovations built on top of
        the TAAL Wallet, while making all such innovations openly available to all ecosystem participants.
      </ListItem>
      <ListItem as="h2" num="6.">
        Maintenance and Support
      </ListItem>
      <p>
        Taal has no maintenance and support obligations in connection with the TAAL Wallet as it is an
        open-source software provided for the benefit of the Taal ecosystem. The Licensee shall be responsible
        for providing maintenance and support to its end users if it so chooses.
      </p>
      <ListItem as="h2" num="7.">
        Payment and Charges
      </ListItem>
      <p>
        The TAAL Wallet is being provided pursuant to this Agreement as an open-source software and free of
        charge.
      </p>
      <ListItem as="h2" num="8.">
        Warranties and Indemnities
      </ListItem>
      <ListItem num="8.1">
        Licensee represents and warrants that it has all necessary and appropriate permissions, rights, and
        powers to enter into and perform its obligations in this Agreement.
      </ListItem>
      <ListItem num="8.2">
        Except as expressly provided in this Section 8, Taal provides the Licensor Materials “as-is” and
        disclaims any and all warranties (whether express or implied), to the extent possible under applicable
        Laws, including without limitation warranties of merchantability, accuracy, fitness for a particular
        purpose, freedom from viruses or other harmful code, title, non-infringement, loss of data, or that
        the TAAL Wallet will be error free, and Licensee acknowledges that it is using Licensor Materials at
        its own risk without representations and warranties of the Taal of any kind.
      </ListItem>
      <ListItem num="8.3">
        Licensee shall indemnify, defend, and hold harmless Taal and its affiliates and its and their
        respective directors, officers, shareholders, employees, and representatives from any out-of-pocket
        costs, damages, losses, judgements, fines, and expenses (including reasonable attorneys’ fees) arising
        from any third party demands, claims, or proceedings (a) based on any facts that, if true, constitute
        (i) a breach by Licensee of this Agreement, (ii) a breach by any of your end users, customers and
        clients of any requirement under this Agreement or a failure by Licensee to impose or enforce such
        requirement, (iii) violation of any Laws applicable to Licensee, your end users, customers and
        clients, including any Data Protection Laws or privacy Laws, or (iv) breach of Licensee’s
        representations and warranties in this Agreement, or (b) arising from any other software used by the
        Licensee or the Licensee Modifications.
      </ListItem>
      <ListItem num="8.4">
        Licensee agrees to indemnify and hold harmless Taal (and its respective directors, officers,
        affiliates, agents, successors and assigns) from and against any and all losses, liabilities,
        deficiencies, costs, damages and expenses (including, without limitation, reasonable attorneys' fees,
        charges and disbursements) incurred by Taal as a result of a) the use of the TAAL Wallet by the
        Licensee or the Licensee's clients, customers and end users, and b) any inaccuracies in or breach of
        the representations, warranties or covenants made by the Licensee herein, provided, however, that the
        Licensee shall not have any obligation to any indemnitee under this Section 8 for any indemnified
        matter caused by the gross negligence or willful misconduct of Taal, as determined by a final judgment
        of a court of competent jurisdiction.
      </ListItem>
      <ListItem as="h2" num="9.">
        Data Protection
      </ListItem>
      <p>
        Licensee shall comply with, and is solely responsible for the conduct of your own business in
        accordance with, all applicable Data Protection Laws and data privacy Laws.
      </p>
      <ListItem as="h2" num="10.">
        Limitation of Liability
      </ListItem>
      <ListItem num="10.1.">
        Except as provided in Section 10.2 below, Taal shall not be liable to Licensee or any third party,
        including any of your clients, customers or end users, for (i) any consequential, incidental, special,
        punitive, exemplary or indirect damages, regardless of whether such person or entity has been advised
        of the possibility of such damages, including but not limited to loss of anticipated profits or
        economic loss, or (ii) the fullest extent permitted under applicable Law, any other damages for any
        claim or series of claims arising under this Agreement.
      </ListItem>
      <ListItem num="10.2.">
        Nothing in this provision, however, shall limit or exclude Taal’s liability: (i) for death or personal
        injury directly and solely caused by the TAAL Wallet, and excluding any applicable claims arising from
        the use of the TAAL Wallet in combination with any materials, information, or software provided by
        Taal or any third party; or (ii) for any deliberate, fraudulent or grossly negligent breach of this
        Agreement by Taal or any liability, which cannot be excluded under mandatory applicable Law.
      </ListItem>
      <ListItem num="10.3.">
        For the avoidance of doubt, in no event shall Taal be liable for any of the following losses or
        damages: loss of use, interruption of business, loss of actual or anticipated profit (including,
        without limitation, loss of profit on existing or expected contracts), loss of data (including, but
        not limited to data which Taal expects Licensee to back-up regularly), third party claims (including
        from patients), loss of revenue, loss of the use of money, loss of currency or Tokens, loss of
        anticipated savings, loss of opportunity, loss of goodwill, loss of reputation, loss of, damage to or
        corruption of data, regardless of the form of action, whether in contract, breach of statutory duty,
        tort (including, without limitation, negligence), strict liability, under penal law, or otherwise. For
        the avoidance of doubt, Taal is not liable for any loss, delay, or breach of this Agreement arising
        out of any cause beyond its reasonable control.
      </ListItem>
      <ListItem num="10.4">
        Notwithstanding anything to the contrary in this Agreement, Taal shall have no liability whatsoever
        arising from: (a) any use of the TAAL Wallet not in strict accordance with this Agreement or the
        applicable Documentation under <u>Annex 1</u>; (b) any failure by Licensee to strictly comply with its
        obligations under this Agreement or its failure to require or enforce applicable obligations under
        this Agreement on any of your clients, customers or end users; (c) any Licensee Modifications or any
        modification to or defect in the TAAL Wallet caused, made, or introduced by or on behalf of Licensee
        or your clients, customers or end users, or any malfunctioning equipment and/or system belonging to
        you or your clients, customers or end users, or in your or their custody or control; (d) access to or
        use of the TAAL Wallet allowed or authorized by Licensee or your clients, customers or end users by
        any third party not properly trained in its use; (e) combination of the TAAL Wallet with any third
        party products or services; or (f) any information, materials, specifications or instructions provided
        or used by Licensee or any of your clients, customers or end users.
      </ListItem>
      <ListItem as="h2" num="11.">
        Term and Termination
      </ListItem>
      <ListItem num="11.1.">
        This Agreement shall commence on the date you download or otherwise acquire access to the TAAL Wallet.
        You may terminate this Agreement by ceasing all use of TAAL Wallet and deleting all copies of the TAAL
        Wallet in your possession.
      </ListItem>
      <ListItem num="11.2.">
        Taal may terminate this Agreement immediately if you breach any term of this Agreement or if your
        usage of the TAAL Wallet breaches any applicable Law. For the avoidance of doubt, failure by Licensee
        to require or enforce applicable terms and conditions on its clients, customers and end users shall
        constitute a breach of this Agreement.
      </ListItem>
      <ListItem num="11.3.">
        Additionally, Taal may terminate this Agreement without reason at its discretion by providing thirty
        (30) days written notice published on the Website or through other generally available media.
      </ListItem>
      <ListItem num="11.4." as="div" isBlock>
        This Agreement is automatically terminated upon:
        <ListItem num="i.">
          i. the other Party is dissolved, ceases to conduct all (or substantially all) of its business, is or
          becomes unable to pay its debts as they fall due, is or becomes insolvent or is declared insolvent
          or convenes a meeting or makes or proposes to make any arrangement or composition with its
          creditors;
        </ListItem>
        <ListItem num="ii.">
          ii. an administrator, administrative receiver, liquidator, receiver, trustee, manager or similar is
          appointed over any of the assets of the other Party; or
        </ListItem>
        <ListItem num="ii.">
          iii. an order is made for the winding up of the other Party, or a resolution is passed for its
          winding up (other than for the purpose of a solvent company reorganization where the resulting
          entity will assume all the obligations of the other Party under this Agreement.
        </ListItem>
      </ListItem>
      <ListItem as="h2" num="12.">
        Applicable Law and Jurisdiction
      </ListItem>
      <ListItem num="12.1.">
        This Agreement shall in all respects be governed by and construed and interpreted in accordance with
        the laws of Switzerland with the exclusion of the Vienna Convention on the International Sale of Goods
        dated April 11, 1980 and the conflict of law rules. The English language shall prevail in the
        interpretation and construction of this Agreement.
      </ListItem>
      <ListItem num="12.2.">
        All disputes arising out of or in connection with the present contract shall be finally settled under
        the Rules of Arbitration of the International Chamber of Commerce by one arbitrator appointed in
        accordance with the said Rules. Place of Jurisdiction shall be Zürich and the arbitration shall be
        held in English.
      </ListItem>
      <ListItem num="12.3.">
        To the extent permitted under applicable Laws, Licensee undertakes not to bring or participate in any
        class action lawsuit, class-wide arbitration, claims brought in a representative capacity, or any
        consolidated claims as to any claim, dispute or controversy that you may have against Taal or its
        affiliates. Licensee agrees to the entry of injunctive relief to stop such a lawsuit or to remove it
        as a participant in such lawsuit. Licensee agrees to pay the attorneys’ fees and court costs that Taal
        incurs in seeking such relief. This provision preventing Licensee from bringing, joining or
        participating in class action lawsuits and other consolidated claims is an independent agreement and
        does not constitute a waiver of any of Licensee’s rights and remedies to pursue a claim individually,
        and not as a class action, in binding arbitration as provided above. Further, unless both Parties
        agree otherwise in writing, the arbitrator may not consolidate Licensee’s claims with any third
        party’s claims, and may not otherwise preside over any form of a representative or class proceeding.
        If this specific provision is found to be unenforceable, then the entirety of this arbitration
        provision shall be null and void.
      </ListItem>
      <ListItem num="12.4.">
        This Agreement is solely between Taal and Licensee. Nothing in this Agreement is intended to create
        third party beneficiaries, including with any of your clients, customers or end users.
      </ListItem>
      <ListItem as="h2" num="13.">
        Miscellaneous
      </ListItem>
      <ListItem num="13.1.">
        <strong>Entire Agreement; Amendments:</strong> Absent a specific written agreement between the Taal
        and the Licensee that supersedes this Agreement, this Agreement contains the entire understanding of
        the Parties with respect to the license of the TAAL Wallet. This Agreement can be amended by Taal by
        posting an updated version on its Website ten (10) days in advance of such amendment.
      </ListItem>
      <ListItem num="13.2.">
        <strong>Survival:</strong> Article 5, 8 10 and 12 and this Section 13.2 shall survive the termination
        of this Agreement.
      </ListItem>
      <ListItem num="13.3.">
        <strong>Severability:</strong> The Parties agree that if any provision or part of a provision of this
        Agreement shall under any circumstances be deemed invalid, inoperative or otherwise not enforceable,
        the Agreement as a whole shall remain valid and the invalid or inoperative provision or part of a
        provision shall be replaced by a provision which the Parties would have agreed on in good faith if
        they had been aware of the invalidity of the respective provision.
      </ListItem>
      <ListItem num="13.4.">
        <strong>No Waiver:</strong> No act, delay or omission on a Party’s part in exercising any right or
        remedy shall operate as a waiver of such or any other right or remedy. No single or partial waiver by
        a Party of any provision of this Agreement, or breach or default by the other Party, or of any right
        or remedy, shall operate as a waiver of any other provision, breach, default, right or remedy or of
        such provision, breach, default, right or remedy on a future occasion.
      </ListItem>
      <ListItem num="13.5.">
        <strong>Independent Contractors:</strong> Taal and Licensee are independent contractors, and except to
        the extent required by law, no agency, partnership, joint venture, employee-employer or
        franchisor-franchisee relationship is intended or created by this Agreement.
      </ListItem>

      <h2 style={{ fontSize: '2rem' }}>Annex 1</h2>
      <a
        href="https://app.gitbook.com/o/oKs2jhJRmplTxslrCdPt/s/JxpbrzHQe89v1HWg3vbN/core-products/taal-wallet"
        target="_blank"
      >
        Documentation of TAAL Wallet
      </a>
      <ButtonWrapper>
        <Button variant="primary" size="md" onClick={onAccept}>
          Accept
        </Button>
        <Button size="md" onClick={() => window.close()}>
          Cancel
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;
