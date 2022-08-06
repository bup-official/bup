import type { NextPage } from "next";
import Head from "next/head";
import { DashboardCards } from "../components/DashboardCards";
import { trpc } from "../utils/trpc";
import { Navigation } from "../components/Navigation";
import { useForm, Resolver } from "react-hook-form";
import { GetHeadersArrType } from "../server/router/header.router";
import { useState } from "react";
import QRCode from 'qrcode'




const Home: NextPage = () => {
  type FormValues = {
    cardSlug: string;
    cardTitle: string;
  }

  const client = trpc.useContext()

  const { data } = trpc.useQuery(["bupCards.get-all-cards"]);

  const { mutate: createMutation } = trpc.useMutation("bupCards.create-slug", {
    onSuccess: () => {
      client.invalidateQueries(["bupCards.get-all-cards"]);
      reset();
    }
  })


  const { reset, register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const onSubmit = handleSubmit(({ cardSlug, cardTitle }) => {
    return createMutation({
      cardSlug,
      cardTitle
    })

  });







  return (
    <>
      {/* todo -- Replace BŪP with the Users dynamic data as in <title> */}
      <Head>
        <title>BŪP | Dashboard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navigation />



      <main id="dashboardMainContent" className="p-12 flex flex-col items-center">

        <h2 id="dashboardHeader" className="text-gradient text-center text-section-h2 font-normal font-quicksand">Dashboard</h2>

        <div id="callToActionWrapper" className="mt-7 lg:flex flex-col gap-y-3">

          <form onSubmit={onSubmit} className="flex flex-col gap-y-4">
            <fieldset className="flex flex-col">
              <label htmlFor="cardSlug" className="">Card Slug</label>
              <input {...register("cardSlug")} placeholder="Card Slug" className="text-black px-2 py-1 rounded-md" />
            </fieldset>

            <fieldset className="flex flex-col">
              <label htmlFor="cardTitle" className="">Card Title</label>
              <input {...register("cardTitle")} placeholder="Card Title" className="text-black px-2 py-1 rounded-md" />
            </fieldset>

            <button className="p-2 border rounded-lg border-slate-200" type="submit">Create Card</button>
          </form>
          {/* <button id="createNewShortLink" className="button-gradient py-2 px-2 rounded-2xl w-48">Create new Short Link</button> */}
        </div>

        <section className="p-14 flex flex-wrap justify-center items-center gap-10 max-w-section mx-auto">
          {data?.map((cardInfo) => (
            <DashboardCards
              key={cardInfo.id}
              inputs={{
                cardTitle: cardInfo?.cardTitle,
                cardSlug: cardInfo?.cardSlug,
                id: cardInfo?.id,
                createdAt: cardInfo?.createdAt
              }}
            />
          ))}
        </section>

      </main>
    </>
  );
};
export default Home;






// const resolver: Resolver<FormValues> = async (values) => {
//   return {
//     values: values.cardSlug ? values : {},
//     errors: !values.cardSlug
//       ? {
//         cardSlug: {
//           type: 'required',
//           message: 'This is required.',
//         },
//       }
//       : {},
//   };
// };

