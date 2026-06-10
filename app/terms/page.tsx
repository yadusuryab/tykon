import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg">
      <head>
        <title>Terms and Conditions - {process.env.NEXT_PUBLIC_APP_NAME} Store</title>
        <meta name="description" content={`Terms and conditions of ${process.env.NEXT_PUBLIC_APP_NAME} store.`} />
      </head>
      <h2 className="text-2xl font-bold text-center mb-4">
        TERMS & CONDITIONS
      </h2>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">RETURN & EXCHANGE POLICY</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>
            <strong>No refunds are available under any circumstances.</strong> We only offer exchanges for damaged, incorrect, or wrong-sized products.
          </li>
          <li>
            You can request an exchange if the product is damaged, has the wrong size, or is incorrect.
          </li>
          <li>
            We do not offer exchanges, returns, or any adjustments for reasons related to personal preferences, dislikes, or change of mind. Individual tastes and preferences may vary.
          </li>
          <li>
            If the product is lost by the courier service, a refund may be considered only under exceptional circumstances and after thorough investigation.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">UNBOXING VIDEO REQUIREMENTS</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>
            A 360-degree video of unboxing the parcel is mandatory for any claims related to damage, incorrect size, missing items, etc. The issue must be clearly shown in the video without any pauses or cuts. This must be reported within 24 hours of receiving the parcel.
          </li>
          <li>
            The video should begin by showing the address label as sent by us, including the outer packaging.
          </li>
          <li>
            <strong>Without a proper unboxing video, no exchange claim will be accepted.</strong>
          </li>
        </ul>
        <p className="mt-2">
          Some customers forget to take an unboxing video and later create fake videos. We do not accept such videos as proof. All customers must follow our guidelines.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">DAMAGE CLAIMS & EXCHANGE PROCESS</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>
            If the product is damaged upon arrival, you must submit the unboxing video within 24 hours of delivery.
          </li>
          <li>
            Once the damage is verified, we will initiate an exchange for the same product.
          </li>
          <li>
            <strong>No monetary refunds will be issued for damaged products.</strong> Only product exchanges are available.
          </li>
          <li>
            If the same product is out of stock, you may choose an alternative product of equal value or receive store credit.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">IMPORTANT NOTES</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>
            Slight color variation or light/dark differences due to digital photography or device screen settings may occur. Therefore, images shown may differ slightly from the actual product. This is not considered damage.
          </li>
          <li>
            Minor issues like loose threads, removable stains, or slight stitching imperfections are not considered damages and will not qualify for exchange.
          </li>
          <li>
            <strong>No refunds or exchanges for:</strong> normal wear and tear, misuse, accidental damage, or products washed/used after delivery.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">*KEEP IN MIND</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>Cancellation is not allowed after placing the order.</li>
          <li>
            If you want to exchange a product due to size issues (non-damage), you must bear the courier charges. If the issue (damage/incorrect product) is from our side, we will cover the courier cost only after you provide the dispatch slip.
          </li>
          <li>The quality of the product is based on the price you pay.</li>
          <li><strong>No refunds are available — only exchanges for valid damage/incorrect product claims.</strong></li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">SHIPPING & DELIVERY</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>We are not the owners of any courier services.</li>
          <li>
            We send parcels through third-party courier services. If there is any delay in delivery, we are not responsible as it is beyond our control. However, 24x7 support is available from our side with 100% effort to resolve the issue. If the issue remains unresolved, it will be handled through mutual discussion.
          </li>
          <li>
            Do not request refunds or order cancellations due to courier delays. Please be patient and cooperate.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">SIZE EXCHANGE CONDITIONS</h3>
        <p className="mt-2">
          If you wish to exchange the delivered product with the same shoes in a different size, it will be processed based on stock availability.
        </p>
        <p className="mt-2">
          However, if you ordered size 10 and received the correct size as per your order but later wish to exchange for a larger size, this is not possible, as we clearly specify the maximum available size (size 10) before purchase. Similarly, if you order size 6 and wish to exchange it with size 5 (which is smaller), this is also not possible. Please keep this in mind while placing your order.
        </p>
        <p className="mt-2 font-semibold">
          Note: Size exchanges are only offered when we send the wrong size by mistake — not for personal preference changes.
        </p>
      </section>

      <section className="mb-6">
        <h3 className="text-2xl font-semibold">SUMMARY</h3>
        <ul className="list-disc ml-6 mt-2">
          <li>✅ Exchange available for: Damaged products, incorrect products, wrong size sent by us.</li>
          <li>❌ No exchange/return for: Personal preference, change of mind, minor imperfections, courier delays.</li>
          <li>💰 No refunds available — only product exchanges or store credit (if product is out of stock).</li>
        </ul>
      </section>

      <p className="mt-4 text-center font-bold">
        Note: Read carefully; do not scroll without understanding. Later, do not blame us. By placing an order, you agree that <strong>no refunds will be provided — only exchanges for valid damage or incorrect product claims.</strong> If you have any doubts, clarify them with us before placing an order.
      </p>

      <p className="mt-4 text-center font-semibold">
        BEST REGARDS, {process.env.NEXT_PUBLIC_APP_NAME} TEAM
      </p>
    </div>
  );
};

export default TermsAndConditions;