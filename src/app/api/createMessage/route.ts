



// export async function POST(req: NextRequest): Promise<NextResponse> {
//   const body = await req.json();
//   const supabase = createRouteHandlerClient<Database>({ cookies });

//   const { childrenIds, values } = body as {
//     childrenIds: string[];
//     values: AddMealForm;
//   };

//   const formattedDate = formatTime(values.time);

//   const mealData = childrenIds.map((childId) => {
//     return {
//       time: formattedDate!,
//       child_id: childId,
//       meal_type: values.mealType,
//       quantity: values.quantity,
//       description: values.description,
//     };
//   });

//   const { error, status, statusText } = await supabase.from("meal_reports").insert(mealData);
//   if (error) return NextResponse.json(error, {status, statusText});

//   return NextResponse.json(true);
// }