<>
                        {item.data.map((data: any, dataIndex: any) => (
                          <tr
                            key={`${item._id}-${dataIndex}-combo`}
                            className={`${dataIndex === 0 ? "border-t-[1px] border-[#f3aa3589]" : ""
                              } text-center font-extralight border-[#f3aa3589] border-[1px] ${dataIndex === item.data.length - 1
                                ? "border-b-[#d8d2d2a3]"
                                : "border-b-[#414141]"
                              }  hover:bg-black dark:hover:bg-gray-100`}
                          >
                            <td className="w-[20%] py-4">
                              <div className="w-full flex flex-col gap-1 px-3">
                                <span
                                  className={`text-white
                                  dark:text-black dark:text-opacity-85
                                  font-medium text-left text-sm md:text-lg`}
                                >
                                  {data.sport_title}
                                </span>
                                <span className="text-[9px]  md:text-[13px] text-left">
                                  <span
                                    className={data.bet_on === "home_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                    {data.home_team.name}
                                  </span>{" "}
                                  <span className="dark:text-black text-white">
                                    v/s
                                  </span>{" "}
                                  <span
                                    className={data.bet_on === "away_team" ? "text-[#FFC400]" : "dark:text-black text-white"}>
                                    {data.away_team.name}
                                  </span>
                                </span>
                                <span
                                className={`text-[9px] md:text-[11px] px-3 py-1.5  border-[1px] border-white dark:border-black dark:border-opacity-30 dark:text-black border-opacity-30 text-white text-opacity-60 rounded-lg w-fit`}
                              >
                                {new Date(data.commence_time).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })} At <span className="text-right">{new Date(data.commence_time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
                              </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg text-gray-500">
                              --/--
                            </td>
                            <td
                              className={`uppercase text-sm md:text-lg dark:text-black text-white`}
                            >
                              {data.market}
                            </td>
                            <td className="text-sm md:text-lg">
                              <div className="flex flex-col gap-2">
                                <span
                                  className={`text-sm text-white dark:text-black`}
                                >
                                  {data.oddsFormat}
                                </span>
                                <span
                                  className={`text-white dark:text-black`}
                                >
                                  {data.bet_on === "away_team"
                                    ? data.away_team.odds
                                    : data.home_team.odds}
                                </span>
                              </div>
                            </td>
                            <td className="text-sm md:text-lg text-gray-500">
                              --/--
                            </td>
                            <td
                              className={`text-sm font-semibold ${data.status === "lost"
                                ? "text-gray-500"
                                : data.status === "won" ? "text-green-500 shadow-md" : data.status === "pending" ? 'text-yellow-500' : 'text-red-500'
                                } md:text-lg capitalize `}
                            >
                              {data.status}
                            </td>
                            <td className="text-white">
                            <ResolveButton id={data._id + ""} />
                            <EditButton id={data._id + ""} betdata={item}  />
                            </td>
                          </tr>

                        ))}
                        <tr className="text-center font-extralight dark:bg-gradient-to-b dark:from-gray-100 dark:to-gray-100 bg-gradient-to-b from-[#1c1a2176] to-[#0d0c156d] border-[1px] border-[#f3aa357c]">
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf text-white dark:text-black
                              `}
                          >
                            $ {item.amount}
                          </td>
                          <td className="py-3"></td>
                          <td className="py-3"></td>
                          <td
                            className={`py-3 text-lf text-white dark:text-black
                              `}
                          >
                            {item.possibleWinningAmount.toFixed(3)}
                          </td>
                          <td
                            className={`text-sm font-semibold ${data.status === "lost"
                              ? "text-gray-500"
                              : data.status === "won" ? "text-green-500 shadow-md" : data.status === "pending" ? 'text-yellow-500' : 'text-red-500'
                              } md:text-lg capitalize `}
                          >
                            {data.status}
                          </td>
                        
                          <td className="text-white">
                            
                          </td>
                        </tr>
                      </>