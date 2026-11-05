/**
 * DUONG LEN DINH OLYMPIA - Ngân hàng Đề thi Đa Môn Học & Quản lý Sự Kiện (Vite ES Module)
 * Thiết kế chuẩn kiến thức Tiểu học (Lớp 3 - 4 - 5)
 * Hỗ trợ tạo Sự kiện (Event), chọn Bộ đề thi trước trận đấu và đồng bộ đám mây
 */

// =============================================================================
// 1. CÁC BỘ ĐỀ THI MẪU (QUESTION BANKS)
// =============================================================================

export const DEFAULT_QUESTION_BANKS = {
  // BỘ ĐỀ 1: KIẾN THỨC TỔNG HỢP
  bank_tong_hop: {
    id: "bank_tong_hop",
    title: "Kiến thức Tổng Hợp - Khối Tiểu Học",
    subject: "Kiến thức Tổng hợp",
    grade: "Lớp 3 - 4 - 5",
    topic: "Toán, Tiếng Việt, Khoa học, Lịch sử & Đố vui",
    round1: {
      timeLimit: 15,
      pointsPerQuestion: 10,
      teamsQuestions: {
        1: [
          {
            id: 101,
            question: "Hình tam giác có bao nhiêu cạnh và bao nhiêu đỉnh?",
            options: ["A. 3 cạnh và 3 đỉnh", "B. 4 cạnh và 4 đỉnh", "C. 3 cạnh và 4 đỉnh", "D. 2 cạnh và 3 đỉnh"],
            correct: 0,
            explanation: "Hình tam giác có đúng 3 cạnh và 3 đỉnh."
          },
          {
            id: 102,
            question: "Trong câu thơ: 'Rừng cọ đồi chè, đồng xanh ngào ngạt', từ nào là từ chỉ màu sắc?",
            options: ["A. Ngào ngạt", "B. Xanh", "C. Đồi chè", "D. Rừng cọ"],
            correct: 1,
            explanation: "'Xanh' là từ chỉ đặc điểm màu sắc."
          },
          {
            id: 103,
            question: "Thủ đô của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam là thành phố nào?",
            options: ["A. TP. Hồ Chí Minh", "B. Đà Nẵng", "C. Hà Nội", "D. Hải Phòng"],
            correct: 2,
            explanation: "Thủ đô nước ta là Hà Nội ngàn năm văn hiến."
          },
          {
            id: 104,
            question: "Cơ quan nào trong cơ thể người có nhiệm vụ co bóp để bơm máu đi nuôi cơ thể?",
            options: ["A. Dạ dày", "B. Phổi", "C. Quả tim", "D. Lá gan"],
            correct: 2,
            explanation: "Trái tim hoạt động như một chiếc máy bơm máu không ngừng nghỉ."
          },
          {
            id: 105,
            question: "Con gì đập thì sống, không đập thì chết?",
            options: ["A. Con tim", "B. Con cá", "C. Con muỗi", "D. Con cua"],
            correct: 0,
            explanation: "Đó là trái tim (con tim)!"
          }
        ],
        2: [
          {
            id: 106,
            question: "Số lớn nhất có 3 chữ số khác nhau là số nào?",
            options: ["A. 999", "B. 987", "C. 989", "D. 978"],
            correct: 1,
            explanation: "Số lớn nhất có 3 chữ số khác nhau là 987 (chữ số hàng trăm là 9, hàng chục là 8, hàng đơn vị là 7)."
          },
          {
            id: 107,
            question: "Từ nào sau đây viết ĐÚNG chính tả?",
            options: ["A. Xắp xếp", "B. Sắp sếp", "C. Sắp xếp", "D. Xắp sếp"],
            correct: 2,
            explanation: "Cách viết chuẩn chính tả Tiếng Việt là 'Sắp xếp'."
          },
          {
            id: 108,
            question: "Đỉnh núi nào được mệnh danh là 'Nóc nhà Đông Dương'?",
            options: ["A. Phan-xi-păng (Fansipan)", "B. Langbiang", "C. Núi Bà Đen", "D. Mẫu Sơn"],
            correct: 0,
            explanation: "Đỉnh Fansipan (Lào Cai) cao 3.143m là đỉnh núi cao nhất Việt Nam và Đông Dương."
          },
          {
            id: 109,
            question: "Loài thực vật nào sau đây bắt mồi (ăn côn trùng)?",
            options: ["A. Cây hoa hồng", "B. Cây nắp ấm", "C. Cây bàng", "D. Cây chuối"],
            correct: 1,
            explanation: "Cây nắp ấm có bộ phận hình chiếc ấm tiết dịch tiêu hóa để bắt côn trùng."
          },
          {
            id: 110,
            question: "Cái gì tay trái cầm được mà tay phải không cầm được?",
            options: ["A. Bút viết", "B. Cái chén", "C. Tay phải của mình", "D. Cục tẩy"],
            correct: 2,
            explanation: "Tay phải không thể tự cầm chính bàn tay phải của mình!"
          }
        ],
        3: [
          {
            id: 111,
            question: "Một năm nhuận theo Dương lịch có tất cả bao nhiêu ngày?",
            options: ["A. 364 ngày", "B. 365 ngày", "C. 366 ngày", "D. 367 ngày"],
            correct: 2,
            explanation: "Năm thường có 365 ngày, năm nhuận có 366 ngày (tháng 2 có 29 ngày)."
          },
          {
            id: 112,
            question: "Điền từ còn thiếu vào thành ngữ: 'Uống nước nhớ ...'?",
            options: ["A. Rừng", "B. Nguồn", "C. Cội", "D. Sông"],
            correct: 1,
            explanation: "Thành ngữ: 'Uống nước nhớ nguồn'."
          },
          {
            id: 113,
            question: "Vị vua đầu tiên dời đô về Thăng Long năm 1010 là ai?",
            options: ["A. Lý Thái Tổ", "B. Lý Nhân Tông", "C. Đinh Bộ Lĩnh", "D. Lê Hoàn"],
            correct: 0,
            explanation: "Vua Lý Thái Tổ (Lý Công Uẩn) đã ban Chiếu dời đô về Thăng Long năm 1010."
          },
          {
            id: 114,
            question: "Nước tồn tại ở ba thể nào trong tự nhiên?",
            options: ["A. Rắn, lỏng, khí", "B. Lỏng, nhớt, đặc", "C. Băng, tuyết, sương", "D. Hơi, mây, mưa"],
            correct: 0,
            explanation: "Nước tồn tại ở thể rắn, thể lỏng và thể khí (hơi nước)."
          },
          {
            id: 115,
            question: "Càng cất đi (hoặc càng lấy bớt đi) thì lại càng to ra. Đó là cái gì?",
            options: ["A. Cái lỗ (Cái hố)", "B. Quả bóng", "C. Núi cát", "D. Nồi cơm"],
            correct: 0,
            explanation: "Cái lỗ/cái hố càng đào lấy đất ra thì nó càng to ra!"
          }
        ],
        4: [
          {
            id: 116,
            question: "Phép nhân: 25 × 4 có kết quả bằng bao nhiêu?",
            options: ["A. 80", "B. 100", "C. 120", "D. 125"],
            correct: 1,
            explanation: "25 × 4 = 100."
          },
          {
            id: 117,
            question: "Bộ phận nào trong câu: 'Bác nông dân đang cày ruộng' trả lời cho câu hỏi 'Ai?'?",
            options: ["A. Bác nông dân", "B. Đang cày", "C. Cày ruộng", "D. Đang cày ruộng"],
            correct: 0,
            explanation: "'Bác nông dân' là chủ ngữ trả lời cho câu hỏi 'Ai?'."
          },
          {
            id: 118,
            question: "Lá cờ Tổ quốc Việt Nam có hình gì ở chính giữa nền cờ đỏ?",
            options: ["A. Bông sen vàng", "B. Ngôi sao vàng năm cánh", "C. Trống đồng", "D. Vòng nguyệt quế"],
            correct: 1,
            explanation: "Quốc kỳ Việt Nam có nền đỏ thắm, ở giữa là ngôi sao vàng 5 cánh tỏa sáng."
          },
          {
            id: 119,
            question: "Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?",
            options: ["A. Sao Kim", "B. Sao Hỏa", "C. Sao Thủy", "D. Trái Đất"],
            correct: 2,
            explanation: "Sao Thủy (Mercury) là hành tinh nằm gần Mặt Trời nhất."
          },
          {
            id: 120,
            question: "Con gì đi thì nằm, đứng thì nằm, nhưng nằm thì lại đứng?",
            options: ["A. Con cá heo", "B. Bàn chân", "C. Con rắn", "D. Con rùa"],
            correct: 1,
            explanation: "Bàn chân: khi ta đi hoặc đứng thì bàn chân nằm sát đất, khi ta nằm thì bàn chân lại đứng lên!"
          }
        ]
      }
    },
    round2: {
      keyword: "TRỐNG ĐỒNG",
      description: "Bảo vật quốc gia thời đại các vua Hùng",
      imageUrl: "",
      pointsKeyword: 40,
      rows: [
        {
          id: 201,
          name: "Hàng ngang 1",
          answer: "HOÀNG",
          length: 5,
          question: "Tên triều đại phong kiến đầu tiên của Việt Nam đặt kinh đô tại Thăng Long là nhà Lý. Màu vàng kim của vua chúa gọi là màu gì?",
          explanation: "Màu hoàng yến / màu hoàng tộc tượng trưng cho vua chúa."
        },
        {
          id: 202,
          name: "Hàng ngang 2",
          answer: "ĐÔNG SƠN",
          length: 7,
          question: "Nền văn hóa khảo cổ nổi tiếng thời kỳ đồ đồng ở miền Bắc Việt Nam mang tên là nền văn hóa gì?",
          explanation: "Nền văn hóa Đông Sơn rực rỡ cách đây hàng nghìn năm."
        },
        {
          id: 203,
          name: "Hàng ngang 3",
          answer: "CHIM LẠC",
          length: 7,
          question: "Hình ảnh loài chim thần thoại thường được khắc sải cánh bay lượn trên mặt trống đồng Đông Sơn là con chim gì?",
          explanation: "Chim Lạc là biểu tượng tâm linh và khát vọng vươn cao của tổ tiên người Việt."
        },
        {
          id: 204,
          name: "Hàng ngang 4",
          answer: "ĐỒNG",
          length: 4,
          question: "Kim loại màu đỏ nâu, dẫn điện và dẫn nhiệt rất tốt, được dùng để đúc chuông và trống cổ là kim loại gì?",
          explanation: "Kim loại đồng nguyên chất hoặc hợp kim đồng (đồng thau, đồng thiếc)."
        }
      ]
    },
    round3: {
      questions: [
        {
          id: 301,
          number: 1,
          points: 10,
          timeLimit: 20,
          question: "Tìm số tiếp theo trong dãy số quy luật: 3, 6, 9, 12, 15, ... ?",
          options: ["A. 16", "B. 18", "C. 20", "D. 21"],
          correct: 1,
          explanation: "Quy luật cộng thêm 3 đơn vị: 15 + 3 = 18."
        },
        {
          id: 302,
          number: 2,
          points: 20,
          timeLimit: 20,
          question: "Sắp xếp các từ sau thành thành ngữ khuyên chăm chỉ: 'công / sắt / nên / Mài / kim'?",
          options: [
            "A. Mài sắt nên công kim",
            "B. Kim mài sắt nên công",
            "C. Có công mài sắt, có ngày nên kim",
            "D. Mài kim nên công sắt"
          ],
          correct: 2,
          explanation: "Thành ngữ: 'Có công mài sắt, có ngày nên kim'."
        },
        {
          id: 303,
          number: 3,
          points: 30,
          timeLimit: 20,
          question: "Bác Ba có 10 con gà và 5 con thỏ. Hỏi tất cả có bao nhiêu cái chân?",
          options: ["A. 30 cái chân", "B. 35 cái chân", "C. 40 cái chân", "D. 50 cái chân"],
          correct: 2,
          explanation: "10 con gà có: 10 × 2 = 20 chân. 5 con thỏ có: 5 × 4 = 20 chân. Tổng: 20 + 20 = 40 chân."
        },
        {
          id: 304,
          number: 4,
          points: 40,
          timeLimit: 20,
          question: "Cần ít nhất bao nhiêu que tính bằng nhau để xếp thành một hình chữ nhật?",
          options: ["A. 4 que tính", "B. 6 que tính", "C. 8 que tính", "D. 5 que tính"],
          correct: 1,
          explanation: "Hình chữ nhật có 2 chiều dài (mỗi cạnh 2 que) và 2 chiều rộng (mỗi cạnh 1 que): 2 + 2 + 1 + 1 = 6 que tính."
        }
      ]
    },
    round4: {
      questionPacks: {
        20: [
          {
            id: 401,
            points: 20,
            question: "Trong bài hát 'Quốc ca Việt Nam' (Tiến quân ca), nhạc sĩ nào là tác giả sáng tác?",
            options: ["A. Văn Cao", "B. Trịnh Công Sơn", "C. Phạm Tuyên", "D. Phong Nhã"],
            correct: 0,
            explanation: "Nhạc sĩ Văn Cao sáng tác ca khúc Tiến quân ca vào năm 1944."
          },
          {
            id: 402,
            points: 20,
            question: "Tháng nào trong năm luôn luôn có ít ngày nhất?",
            options: ["A. Tháng 1", "B. Tháng 2", "C. Tháng 4", "D. Tháng 11"],
            correct: 1,
            explanation: "Tháng 2 chỉ có 28 ngày (hoặc 29 ngày vào năm nhuận)."
          },
          {
            id: 403,
            points: 20,
            question: "Lục địa nào lạnh nhất và có nhiều băng tuyết nhất trên Trái Đất?",
            options: ["A. Châu Á", "B. Châu Âu", "C. Châu Nam Cực", "D. Châu Phi"],
            correct: 2,
            explanation: "Châu Nam Cực là lục địa lạnh nhất, băng bao phủ quanh năm."
          }
        ],
        30: [
          {
            id: 404,
            points: 30,
            question: "Hình vuông có diện tích là 36 cm². Hỏi chu vi của hình vuông đó bằng bao nhiêu?",
            options: ["A. 20 cm", "B. 24 cm", "C. 36 cm", "D. 30 cm"],
            correct: 1,
            explanation: "Cạnh hình vuông là: 6 cm (vì 6 × 6 = 36). Chu vi là: 6 × 4 = 24 cm."
          },
          {
            id: 405,
            points: 30,
            question: "Chiến thắng Bạch Đằng lịch sử năm 938 đánh tan quân Nam Hán do vị anh hùng nào lãnh đạo?",
            options: ["A. Đinh Bộ Lĩnh", "B. Ngô Quyền", "C. Trần Hưng Đạo", "D. Quang Trung"],
            correct: 1,
            explanation: "Anh hùng Ngô Quyền đã dùng mưu đóng cọc gỗ trên sông Bạch Đằng năm 938."
          },
          {
            id: 406,
            points: 30,
            question: "Khí nào cần thiết cho sự sống và hô hấp của con người và hầu hết động thực vật?",
            options: ["A. Khí Ô-xi (O2)", "B. Khí Ni-tơ (N2)", "C. Khí Các-bô-níc (CO2)", "D. Khí Mê-tan"],
            correct: 0,
            explanation: "Khí Ô-xi duy trì sự cháy và sự sống cho muôn loài."
          }
        ],
        40: [
          {
            id: 407,
            points: 40,
            question: "Một đoàn tàu hỏa dài 100m đi qua cây cầu dài 400m với vận tốc 10m/giây. Hỏi mất bao lâu tàu qua hết cầu?",
            options: ["A. 40 giây", "B. 50 giây", "C. 60 giây", "D. 30 giây"],
            correct: 1,
            explanation: "Tổng quãng đường tàu đi qua hết cầu: 400 + 100 = 500m. Thời gian: 500 / 10 = 50 giây."
          },
          {
            id: 408,
            points: 40,
            question: "Hang động tự nhiên lớn nhất thế giới hiện nay nằm ở tỉnh Quảng Bình của Việt Nam tên là gì?",
            options: ["A. Động Phong Nha", "B. Động Thiên Đường", "C. Hang Sơn Đoòng", "D. Động Hương Tích"],
            correct: 2,
            explanation: "Hang Sơn Đoòng được công nhận là hang động tự nhiên lớn nhất hành tinh."
          },
          {
            id: 409,
            points: 40,
            question: "Con gì sáng ăn cơm trưa, trưa ăn cơm tối, tối lại đi ăn cỗ đám giỗ?",
            options: ["A. Con mèo", "B. Con ruồi", "C. Con dơi", "D. Con muỗi"],
            correct: 1,
            explanation: "Câu đố dân gian ví von loài ruồi (ruồi bâu mâm cỗ)."
          }
        ]
      }
    }
  },

  // BỘ ĐỀ 2: TOÁN HỌC & TƯ DUY LOGIC
  bank_toan: {
    id: "bank_toan",
    title: "Toán Học & Tư Duy Logic Tiểu Học",
    subject: "Toán học",
    grade: "Lớp 3 - 4 - 5",
    topic: "Số học, hình học, quy luật toán học & toán đố",
    round1: {
      timeLimit: 15,
      pointsPerQuestion: 10,
      teamsQuestions: {
        1: [
          {
            id: 1101,
            question: "Số gồm 5 nghìn, 3 trăm và 2 đơn vị được viết là:",
            options: ["A. 5320", "B. 5302", "C. 5032", "D. 532"],
            correct: 1,
            explanation: "5 nghìn, 3 trăm, 0 chục, 2 đơn vị viết là 5302."
          },
          {
            id: 1102,
            question: "Phép tính: 48 : 4 + 8 có kết quả bằng:",
            options: ["A. 14", "B. 20", "C. 4", "D. 16"],
            correct: 1,
            explanation: "48 : 4 = 12; 12 + 8 = 20."
          },
          {
            id: 1103,
            question: "Một hình vuông có chu vi là 32 cm. Độ dài cạnh hình vuông là:",
            options: ["A. 8 cm", "B. 16 cm", "C. 6 cm", "D. 4 cm"],
            correct: 0,
            explanation: "Cạnh hình vuông = 32 : 4 = 8 cm."
          },
          {
            id: 1104,
            question: "Một ngày có 24 giờ. Vậy 3 ngày có tất cả bao nhiêu giờ?",
            options: ["A. 48 giờ", "B. 72 giờ", "C. 60 giờ", "D. 96 giờ"],
            correct: 1,
            explanation: "24 × 3 = 72 giờ."
          },
          {
            id: 1105,
            question: "Số chẵn nhỏ nhất có 4 chữ số là:",
            options: ["A. 1000", "B. 1002", "C. 1024", "D. 1111"],
            correct: 0,
            explanation: "1000 là số chẵn nhỏ nhất có 4 chữ số."
          }
        ],
        2: [
          {
            id: 1106,
            question: "Tìm x, biết: x × 6 = 54?",
            options: ["A. x = 8", "B. x = 9", "C. x = 7", "D. x = 6"],
            correct: 1,
            explanation: "x = 54 : 6 = 9."
          },
          {
            id: 1107,
            question: "1 ki-lô-gam bằng bao nhiêu gam?",
            options: ["A. 10 gam", "B. 100 gam", "C. 1000 gam", "D. 10000 gam"],
            correct: 2,
            explanation: "1 kg = 1000 g."
          },
          {
            id: 1108,
            question: "Một góc lớn hơn góc vuông nhưng nhỏ hơn góc bẹt được gọi là:",
            options: ["A. Góc nhọn", "B. Góc tù", "C. Góc bẹt", "D. Góc vuông"],
            correct: 1,
            explanation: "Góc tù lớn hơn góc vuông (90°) và nhỏ hơn góc bẹt (180°)."
          },
          {
            id: 1109,
            question: "Mẹ mua 4 hộp bút, mỗi hộp có 6 chiếc. Hỏi mẹ có bao nhiêu chiếc bút?",
            options: ["A. 20 chiếc", "B. 24 chiếc", "C. 28 chiếc", "D. 30 chiếc"],
            correct: 1,
            explanation: "4 × 6 = 24 chiếc bút."
          },
          {
            id: 1110,
            question: "Số liền trước số 10 000 là số nào?",
            options: ["A. 9 999", "B. 9 990", "C. 10 001", "D. 9 000"],
            correct: 0,
            explanation: "Số liền trước 10 000 là 9 999."
          }
        ],
        3: [
          {
            id: 1111,
            question: "Hình chữ nhật có chiều dài 12 cm, chiều rộng 5 cm. Diện tích là:",
            options: ["A. 34 cm²", "B. 60 cm²", "C. 17 cm²", "D. 50 cm²"],
            correct: 1,
            explanation: "Diện tích = 12 × 5 = 60 cm²."
          },
          {
            id: 1112,
            question: "Số tự nhiên nào nhân với chính nó thì bằng 81?",
            options: ["A. 7", "B. 8", "C. 9", "D. 11"],
            correct: 2,
            explanation: "9 × 9 = 81."
          },
          {
            id: 1113,
            question: "Trong phép chia có dư với số chia là 7, số dư lớn nhất có thể là:",
            options: ["A. 7", "B. 6", "C. 5", "D. 8"],
            correct: 1,
            explanation: "Số dư luôn bé hơn số chia, nên số dư lớn nhất là 6."
          },
          {
            id: 1114,
            question: "Phân số nào sau đây bằng phân số 1/2?",
            options: ["A. 2/4", "B. 2/5", "C. 3/8", "D. 4/6"],
            correct: 0,
            explanation: "2/4 = 1/2."
          },
          {
            id: 1115,
            question: "Nửa giờ bằng bao nhiêu phút?",
            options: ["A. 15 phút", "B. 20 phút", "C. 30 phút", "D. 45 phút"],
            correct: 2,
            explanation: "1 giờ = 60 phút, nửa giờ = 30 phút."
          }
        ],
        4: [
          {
            id: 1116,
            question: "Tính nhẩm: 125 × 8 = ?",
            options: ["A. 800", "B. 900", "C. 1000", "D. 1100"],
            correct: 2,
            explanation: "125 × 8 = 1000."
          },
          {
            id: 1117,
            question: "Một hình tam giác có độ dài 3 cạnh lần lượt là 5cm, 7cm, 8cm. Chu vi là:",
            options: ["A. 15 cm", "B. 18 cm", "C. 20 cm", "D. 22 cm"],
            correct: 2,
            explanation: "Chu vi = 5 + 7 + 8 = 20 cm."
          },
          {
            id: 1118,
            question: "Trung bình cộng của hai số 40 và 60 là:",
            options: ["A. 45", "B. 50", "C. 55", "D. 100"],
            correct: 1,
            explanation: "(40 + 60) : 2 = 50."
          },
          {
            id: 1119,
            question: "1 thế kỷ bằng bao nhiêu năm?",
            options: ["A. 10 năm", "B. 50 năm", "C. 100 năm", "D. 1000 năm"],
            correct: 2,
            explanation: "1 thế kỷ = 100 năm."
          },
          {
            id: 1120,
            question: "Có bao nhiêu số có 2 chữ số?",
            options: ["A. 89 số", "B. 90 số", "C. 99 số", "D. 100 số"],
            correct: 1,
            explanation: "Từ 10 đến 99 có: (99 - 10) + 1 = 90 số."
          }
        ]
      }
    },
    round2: {
      keyword: "HÌNH BÌNH HÀNH",
      description: "Hình học có 2 cặp cạnh đối diện song song và bằng nhau",
      imageUrl: "",
      pointsKeyword: 40,
      rows: [
        {
          id: 1201,
          name: "Hàng ngang 1",
          answer: "SONG SONG",
          length: 8,
          question: "Hai đường thẳng không bao giờ cắt nhau dù kéo dài mãi được gọi là hai đường thẳng gì?",
          explanation: "Hai đường thẳng song song."
        },
        {
          id: 1202,
          name: "Hàng ngang 2",
          answer: "ĐÁY",
          length: 3,
          question: "Trong công thức tính diện tích hình bình hành S = a × h, chữ 'a' đại diện cho độ dài gì?",
          explanation: "Độ dài cạnh đáy."
        },
        {
          id: 1203,
          name: "Hàng ngang 3",
          answer: "CHIỀU CAO",
          length: 8,
          question: "Đoạn thẳng vuông góc nối từ một đỉnh xuống cạnh đáy đối diện trong hình bình hành gọi là gì?",
          explanation: "Chiều cao (h)."
        },
        {
          id: 1204,
          name: "Hàng ngang 4",
          answer: "BỐN",
          length: 3,
          question: "Hình bình hành là một hình tứ giác, vậy nó có tất cả bao nhiêu cạnh?",
          explanation: "Hình tứ giác có 4 cạnh."
        }
      ]
    },
    round3: {
      questions: [
        {
          id: 1301,
          number: 1,
          points: 10,
          timeLimit: 20,
          question: "Tìm số còn thiếu: 1, 4, 9, 16, 25, ... ?",
          options: ["A. 30", "B. 36", "C. 40", "D. 49"],
          correct: 1,
          explanation: "Quy luật số chính phương: 1×1, 2×2, 3×3, 4×4, 5×5, 6×6 = 36."
        },
        {
          id: 1302,
          number: 2,
          points: 20,
          timeLimit: 20,
          question: "Tổng của 3 số tự nhiên liên tiếp là 30. Số ở giữa là bao nhiêu?",
          options: ["A. 9", "B. 10", "C. 11", "D. 12"],
          correct: 1,
          explanation: "Số ở giữa = 30 : 3 = 10 (3 số là 9, 10, 11)."
        },
        {
          id: 1303,
          number: 3,
          points: 30,
          timeLimit: 20,
          question: "An có 15 viên bi, Bình có số bi gấp đôi An. Hỏi cả hai bạn có bao nhiêu viên bi?",
          options: ["A. 30 viên", "B. 40 viên", "C. 45 viên", "D. 50 viên"],
          correct: 2,
          explanation: "Bình có: 15 × 2 = 30 viên. Cả hai có: 15 + 30 = 45 viên."
        },
        {
          id: 1304,
          number: 4,
          points: 40,
          timeLimit: 20,
          question: "Cắt một khúc gỗ thành 5 đoạn thì cần phải cưa bao nhiêu lần?",
          options: ["A. 5 lần", "B. 4 lần", "C. 6 lần", "D. 3 lần"],
          correct: 1,
          explanation: "Để chia thành 5 khúc gỗ chỉ cần 4 nhát cưa."
        }
      ]
    },
    round4: {
      questionPacks: {
        20: [
          {
            id: 1401,
            points: 20,
            question: "Số tự nhiên bé nhất là số nào?",
            options: ["A. 1", "B. 0", "C. Không có", "D. 10"],
            correct: 1,
            explanation: "Số 0 là số tự nhiên bé nhất."
          },
          {
            id: 1402,
            points: 20,
            question: "Chu vi hình vuông có cạnh 7cm là:",
            options: ["A. 28 cm", "B. 49 cm", "C. 14 cm", "D. 21 cm"],
            correct: 0,
            explanation: "Chu vi = 7 × 4 = 28 cm."
          },
          {
            id: 1403,
            points: 20,
            question: "Số La Mã XIX tương ứng với số tự nhiên nào?",
            options: ["A. 14", "B. 19", "C. 21", "D. 16"],
            correct: 1,
            explanation: "X (10) + IX (9) = 19."
          }
        ],
        30: [
          {
            id: 1404,
            points: 30,
            question: "Một lớp học có 36 học sinh, trong đó 1/3 là học sinh giỏi. Có bao nhiêu học sinh giỏi?",
            options: ["A. 9 bạn", "B. 12 bạn", "C. 15 bạn", "D. 18 bạn"],
            correct: 1,
            explanation: "36 : 3 = 12 bạn."
          },
          {
            id: 1405,
            points: 30,
            question: "Tích của số lớn nhất có 1 chữ số và số bé nhất có 2 chữ số là:",
            options: ["A. 90", "B. 80", "C. 99", "D. 100"],
            correct: 0,
            explanation: "9 × 10 = 90."
          },
          {
            id: 1406,
            points: 30,
            question: "Đố vui: Có 3 quả táo trên bàn, bạn lấy đi 2 quả. Hỏi bạn có mấy quả táo?",
            options: ["A. 1 quả", "B. 2 quả", "C. 3 quả", "D. 0 quả"],
            correct: 1,
            explanation: "Bạn vừa lấy đi 2 quả thì bạn đang cầm 2 quả táo trên tay!"
          }
        ],
        40: [
          {
            id: 1407,
            points: 40,
            question: "Vừa gà vừa chó có tất cả 10 con và 28 cái chân. Hỏi có bao nhiêu con chó?",
            options: ["A. 3 con", "B. 4 con", "C. 5 con", "D. 6 con"],
            correct: 1,
            explanation: "Giả sử cả 10 con đều là gà thì có 20 chân. Số chân dôi ra: 28 - 20 = 8. Số chó: 8 / 2 = 4 con."
          },
          {
            id: 1408,
            points: 40,
            question: "Nếu ngày 1 của một tháng là thứ Hai thì ngày 22 của tháng đó là thứ mấy?",
            options: ["A. Chủ nhật", "B. Thứ Hai", "C. Thứ Ba", "D. Thứ Bảy"],
            correct: 1,
            explanation: "22 - 1 = 21 ngày (chia hết cho 7), do đó ngày 22 cũng chính là thứ Hai."
          },
          {
            id: 1409,
            points: 40,
            question: "Một con ốc sên trèo lên cây cau cao 10m. Ngày trèo 3m, đêm tụt 2m. Mấy ngày sên lên tới ngọn?",
            options: ["A. 10 ngày", "B. 9 ngày", "C. 8 ngày", "D. 7 ngày"],
            correct: 2,
            explanation: "Sau 7 ngày đêm sên ở độ cao 7m. Ngày thứ 8 trèo thêm 3m lên thẳng ngọn (10m) trước khi trời tối!"
          }
        ]
      }
    }
  },

  // BỘ ĐỀ 3: TIẾNG VIỆT & VĂN HỌC
  bank_tieng_viet: {
    id: "bank_tieng_viet",
    title: "Tiếng Việt & Đố Chữ Tiểu Học",
    subject: "Tiếng Việt",
    grade: "Lớp 3 - 4 - 5",
    topic: "Luyện từ và câu, thành ngữ, tục ngữ, chính tả & văn học",
    round1: {
      timeLimit: 15,
      pointsPerQuestion: 10,
      teamsQuestions: {
        1: [
          {
            id: 2101,
            question: "Từ nào sau đây đồng nghĩa với từ 'Dũng cảm'?",
            options: ["A. Nhút nhát", "B. Can đảm", "C. Hèn nhát", "D. E dè"],
            correct: 1,
            explanation: "'Can đảm' đồng nghĩa với 'Dũng cảm'."
          },
          {
            id: 2102,
            question: "Điền từ vào thành ngữ: 'Lá lành đùm lá ...'?",
            options: ["A. Rách", "B. Vàng", "C. Non", "D. Khô"],
            correct: 0,
            explanation: "Thành ngữ: 'Lá lành đùm lá rách'."
          },
          {
            id: 2103,
            question: "Trong câu: 'Mặt trời tỏa ánh nắng chói chang', đâu là vị ngữ?",
            options: ["A. Mặt trời", "B. Tỏa ánh nắng", "C. Tỏa ánh nắng chói chang", "D. Ánh nắng"],
            correct: 2,
            explanation: "Vị ngữ là cụm động từ 'Tỏa ánh nắng chói chang'."
          },
          {
            id: 2104,
            question: "Từ nào là từ ghép trong các từ sau?",
            options: ["A. Xanh xao", "B. Nhà cửa", "C. Thong thả", "D. Rón rén"],
            correct: 1,
            explanation: "'Nhà cửa' là từ ghép đẳng lập có nghĩa rõ ràng."
          },
          {
            id: 2105,
            question: "Câu chuyện 'Cây khế' khuyên răn con người điều gì?",
            options: ["A. Phải lười biếng", "B. Không được tham lam", "C. Phải nói dối", "D. Đi xa"],
            correct: 1,
            explanation: "Truyện khuyên con người chăm chỉ, thật thà và không được tham lam."
          }
        ],
        2: [
          {
            id: 2106,
            question: "Cặp từ nào sau đây là cặp từ trái nghĩa?",
            options: ["A. Đen - Trắng", "B. To - Lớn", "C. Vui - Mừng", "D. Đẹp - Xinh"],
            correct: 0,
            explanation: "'Đen' và 'Trắng' là hai màu trái ngược nhau."
          },
          {
            id: 2107,
            question: "Từ nào sau đây viết ĐÚNG chính tả?",
            options: ["A. Gian xảo", "B. Dang xảo", "C. Gian sảo", "D. Dang sảo"],
            correct: 0,
            explanation: "Từ đúng là 'Gian xảo'."
          },
          {
            id: 2108,
            question: "Tác giả của tập thơ thiếu nhi 'Góc sân và khoảng trời' là nhà thơ nào?",
            options: ["A. Huy Cận", "B. Trần Đăng Khoa", "C. Xuân Diệu", "D. Tố Hữu"],
            correct: 1,
            explanation: "Nhà thơ Trần Đăng Khoa sáng tác khi còn là một học sinh nhỏ tuổi."
          },
          {
            id: 2109,
            question: "Điền từ vào chỗ trống: 'Học thầy không tày học ...'?",
            options: ["A. Bác", "B. Bạn", "C. Anh", "D. Mẹ"],
            correct: 1,
            explanation: "Tục ngữ: 'Học thầy không tày học bạn'."
          },
          {
            id: 2110,
            question: "Dấu câu nào dùng để đánh dấu ranh giới các vế trong câu ghép?",
            options: ["A. Dấu chấm hỏi", "B. Dấu phẩy", "C. Dấu chấm cảm", "D. Dấu ngoặc kép"],
            correct: 1,
            explanation: "Dấu phẩy thường dùng để ngăn cách các vế câu ghép."
          }
        ],
        3: [
          {
            id: 2111,
            question: "Biện pháp tu từ nào được dùng trong câu: 'Trăng tròn như quả bóng'?",
            options: ["A. Nhân hóa", "B. So sánh", "C. Điệp từ", "D. Đảo ngữ"],
            correct: 1,
            explanation: "Có từ so sánh 'như' giữa mặt trăng và quả bóng."
          },
          {
            id: 2112,
            question: "Từ nào sau đây chỉ tính tình con người?",
            options: ["A. Hiền lành", "B. Nhà cao", "C. Áo xanh", "D. Đường dài"],
            correct: 0,
            explanation: "'Hiền lành' là từ ngữ chỉ tính cách, đạo đức con người."
          },
          {
            id: 2113,
            question: "Chữ 'đồng' trong từ 'đồng hương' có nghĩa là gì?",
            options: ["A. Kim loại đồng", "B. Cánh đồng", "C. Cùng nhau / Cùng chung", "D. Trẻ con"],
            correct: 2,
            explanation: "'Đồng' là cùng (cùng quê hương)."
          },
          {
            id: 2114,
            question: "Ai là nhân vật chính trong tác phẩm 'Dế Mèn phiêu lưu ký' của Tô Hoài?",
            options: ["A. Dế Choắt", "B. Dế Mèn", "C. Bọ Ngựa", "D. Xiến Tóc"],
            correct: 1,
            explanation: "Dế Mèn là nhân vật chính với hành trình phiêu lưu học hỏi."
          },
          {
            id: 2115,
            question: "Thành ngữ nào sau đây khen ngợi tình cảm gia đình hòa thuận?",
            options: ["A. Thuận vợ thuận chồng", "B. Nước chảy đá mòn", "C. Đứng núi này trông núi nọ", "D. Giấu đầu hở đuôi"],
            correct: 0,
            explanation: "'Thuận vợ thuận chồng tát Biển Đông cũng cạn'."
          }
        ],
        4: [
          {
            id: 2116,
            question: "Bộ phận in đậm trong câu: 'Sáng nay, em đi học sớm' là gì?",
            options: ["A. Chủ ngữ", "B. Trạng ngữ", "C. Vị ngữ", "D. Bổ ngữ"],
            correct: 1,
            explanation: "'Sáng nay' là trạng ngữ chỉ thời gian."
          },
          {
            id: 2117,
            question: "Từ láy nào gợi tả tiếng cười giòn giã?",
            options: ["A. Khúc khích", "B. Ha hả", "C. Tủm tỉm", "D. Hì hì"],
            correct: 1,
            explanation: "'Ha hả' miêu tả tiếng cười to, sảng khoái và giòn giã."
          },
          {
            id: 2118,
            question: "Tên vị nữ tướng anh hùng cưỡi voi ra trận đánh giặc Ngô là ai?",
            options: ["A. Bà Triệu (Triệu Thị Trinh)", "B. Võ Thị Sáu", "C. Bùi Thị Xuân", "D. Nguyễn Thị Minh Khai"],
            correct: 0,
            explanation: "Bà Triệu cưỡi voi xung phong đánh tan quân giặc Ngô."
          },
          {
            id: 2119,
            question: "Từ nào không cùng nhóm với các từ còn lại?",
            options: ["A. Yêu thương", "B. Quý mến", "C. Ghét bỏ", "D. Thân thương"],
            correct: 2,
            explanation: "'Ghét bỏ' mang nghĩa tiêu cực, trái ngược với các từ kia."
          },
          {
            id: 2120,
            question: "Câu: 'Cây bàng xòe tán ô xanh che mát cho sân trường' dùng biện pháp nghệ thuật gì?",
            options: ["A. So sánh", "B. Nhân hóa", "C. Ẩn dụ", "D. Cả nhân hóa và so sánh ngầm"],
            correct: 3,
            explanation: "Cây bàng được miêu tả như người đang xòe tán ô che mát."
          }
        ]
      }
    },
    round2: {
      keyword: "TRUYỀN THỐNG",
      description: "Nét đẹp văn hóa và đạo lý tốt đẹp được truyền từ đời này sang đời khác",
      imageUrl: "",
      pointsKeyword: 40,
      rows: [
        {
          id: 2201,
          name: "Hàng ngang 1",
          answer: "TÔN SƯ",
          length: 5,
          question: "Thành ngữ dạy học sinh phải biết kính trọng thầy cô giáo là: '... trọng đạo'?",
          explanation: "Tôn sư trọng đạo."
        },
        {
          id: 2202,
          name: "Hàng ngang 2",
          answer: "LỊCH SỬ",
          length: 6,
          question: "Môn học ghi chép lại những chặng đường dựng nước và giữ nước của cha ông gọi là môn gì?",
          explanation: "Môn Lịch sử."
        },
        {
          id: 2203,
          name: "Hàng ngang 3",
          answer: "HIẾU HỌC",
          length: 7,
          question: "Đức tính yêu thích và say mê việc học tập, mở mang kiến thức của dân tộc ta gọi là gì?",
          explanation: "Truyền thống hiếu học."
        },
        {
          id: 2204,
          name: "Hàng ngang 4",
          answer: "CA DAO",
          length: 5,
          question: "Những câu vần vè dân gian truyền miệng phản ánh tình cảm, đạo đức dân tộc được gọi là gì?",
          explanation: "Ca dao, tục ngữ."
        }
      ]
    },
    round3: {
      questions: [
        {
          id: 2301,
          number: 1,
          points: 10,
          timeLimit: 20,
          question: "Tìm từ trái nghĩa với từ 'Siêng năng'?",
          options: ["A. Lười biếng", "B. Cần cù", "C. Chăm chỉ", "D. Khéo léo"],
          correct: 0,
          explanation: "Trái nghĩa với siêng năng là lười biếng."
        },
        {
          id: 2302,
          number: 2,
          points: 20,
          timeLimit: 20,
          question: "Điền từ còn thiếu vào câu: 'Gần mực thì đen, gần đèn thì ...'?",
          options: ["A. Sáng", "B. Tối", "C. Rạng", "D. Xanh"],
          correct: 0,
          explanation: "Tục ngữ: 'Gần mực thì đen, gần đèn thì sáng'."
        },
        {
          id: 2303,
          number: 3,
          points: 30,
          timeLimit: 20,
          question: "Đố chữ: Để nguyên giúp bé viết bài, thêm huyền ấm áp giữa ngày mùa đông. Là hai chữ nào?",
          options: ["A. Bút - Bụt", "B. Phấn - Phẫn", "C. Thước - Thược", "D. Bút - Buồn"],
          correct: 0,
          explanation: "Chữ BÚT (viết bài), thêm dấu huyền thành BỤT (ông Bụt hiền từ ấm áp)."
        },
        {
          id: 2304,
          number: 4,
          points: 40,
          timeLimit: 20,
          question: "Sắp xếp các chữ cái sau thành một từ ghép có ý nghĩa: 'S - Á - C - H - V - Ở'?",
          options: ["A. Sách vở", "B. Vở sách", "C. Sạch vở", "D. Vở sạch"],
          correct: 0,
          explanation: "Ghép lại thành từ 'Sách vở'."
        }
      ]
    },
    round4: {
      questionPacks: {
        20: [
          {
            id: 2401,
            points: 20,
            question: "Từ nào sau đây viết SAI chính tả?",
            options: ["A. Rực rỡ", "B. Nở rộ", "C. Rộng rãi", "D. Dực dỡ"],
            correct: 3,
            explanation: "'Dực dỡ' là sai, từ đúng là 'Rực rỡ'."
          },
          {
            id: 2402,
            points: 20,
            question: "Trong câu: 'Chim hót líu lo trên cành', từ 'líu lo' là từ loại gì?",
            options: ["A. Từ tượng hình", "B. Từ tượng thanh", "C. Danh từ", "D. Quan hệ từ"],
            correct: 1,
            explanation: "'Líu lo' mô phỏng âm thanh tiếng chim hót."
          },
          {
            id: 2403,
            points: 20,
            question: "Tập hợp các chữ cái theo một thứ tự quy định của ngôn ngữ gọi là gì?",
            options: ["A. Bảng chữ cái", "B. Từ điển", "C. Ngữ pháp", "D. Câu văn"],
            correct: 0,
            explanation: "Bảng chữ cái (Alphabet)."
          }
        ],
        30: [
          {
            id: 2404,
            points: 30,
            question: "Nghĩa của từ 'Đoàn kết' là gì?",
            options: [
              "A. Cùng chung sức, đồng lòng vì một mục đích chung",
              "B. Chia rẽ lẫn nhau",
              "C. Tranh giành quyền lợi",
              "D. Làm việc một mình"
            ],
            correct: 0,
            explanation: "Đoàn kết là gắn bó, hợp lực làm nên sức mạnh."
          },
          {
            id: 2405,
            points: 30,
            question: "Thành ngữ 'Một nắng hai sương' miêu tả phẩm chất gì của người nông dân?",
            options: ["A. Giàu có", "B. Cần cù, chịu thương chịu khó", "C. Thông minh", "D. Vui vẻ"],
            correct: 1,
            explanation: "Ca ngợi sự vất vả, chăm chỉ lao động của người nông dân."
          },
          {
            id: 2406,
            points: 30,
            question: "Truyện ngụ ngôn 'Thầy bói xem voi' phê phán điều gì?",
            options: [
              "A. Xem xét sự việc phiến diện, chủ quan",
              "B. Khen ngợi con voi to",
              "C. Thích nuôi thú cưng",
              "D. Lười biếng"
            ],
            correct: 0,
            explanation: "Phê phán thói nhìn nhận sự việc phiến diện, chỉ sờ một phần mà phán xét cả thể."
          }
        ],
        40: [
          {
            id: 2407,
            points: 40,
            question: "Đố vui chữ nghĩa: 'Trời sinh một cặp vuông tròn, vừa mở vừa khép sớm hôm đỡ đần'. Là cái gì trong nhà?",
            options: ["A. Cái gương soi", "B. Cánh cửa", "C. Cái đồng hồ", "D. Chiếc ti vi"],
            correct: 1,
            explanation: "Đó là cánh cửa nhà (có then cài, bản lề, mở ra khép vào)."
          },
          {
            id: 2408,
            points: 40,
            question: "Điền 4 từ còn thiếu vào câu tục ngữ: 'Lời nói chẳng mất tiền mua, ...'?",
            options: [
              "A. Lựa lời mà nói cho vừa lòng nhau",
              "B. Nói năng cho thật rõ ràng",
              "C. Cứ việc mà nói cho hay",
              "D. Ai nghe thì nghe"
            ],
            correct: 0,
            explanation: "Tục ngữ: 'Lời nói chẳng mất tiền mua, lựa lời mà nói cho vừa lòng nhau'."
          },
          {
            id: 2409,
            points: 40,
            question: "Nhà thơ nào được mệnh danh là 'Thần Đồng Thơ Ca' với bài thơ 'Hạt gạo làng ta'?",
            options: ["A. Huy Cận", "B. Trần Đăng Khoa", "C. Xuân Quỳnh", "D. Nguyễn Khoa Điềm"],
            correct: 1,
            explanation: "Nhà thơ Trần Đăng Khoa sáng tác 'Hạt gạo làng ta' năm 1968 khi mới 10 tuổi."
          }
        ]
      }
    }
  }
};

// =============================================================================
// 2. DANH SÁCH CÁC SỰ KIỆN / TIẾT HỌC MẪU (PRESET EVENTS)
// =============================================================================

export const DEFAULT_EVENTS = [
  {
    id: "evt_tong_hop",
    title: "Hội Thi Olympia Rung Chuông Vàng - Toàn Trường",
    subject: "Kiến thức Tổng hợp",
    grade: "Tiểu Học (Lớp 3 - 4 - 5)",
    topic: "Toán, Tiếng Việt, Khoa học, Lịch sử & Đố vui",
    questionBankId: "bank_tong_hop",
    createdAt: "2026-11-03T10:00:00Z",
    teams: [
      { id: 1, name: "Đội Tri Thức", color: "#c82333", accent: "#e63946", score: 0 },
      { id: 2, name: "Đội Khám Phá", color: "#1e40af", accent: "#3b82f6", score: 0 },
      { id: 3, name: "Đội Sáng Tạo", color: "#d97706", accent: "#e5a50a", score: 0 },
      { id: 4, name: "Đội Vươn Cao", color: "#059669", accent: "#10b981", score: 0 }
    ]
  },
  {
    id: "evt_toan",
    title: "Thử Thách Toán Học Tư Duy - Khối 4 & 5",
    subject: "Toán học",
    grade: "Lớp 4 - Lớp 5",
    topic: "Quy luật số học, hình học phẳng & toán đố thực tế",
    questionBankId: "bank_toan",
    createdAt: "2026-11-03T10:05:00Z",
    teams: [
      { id: 1, name: "Tia Chớp Số Học", color: "#c82333", accent: "#e63946", score: 0 },
      { id: 2, name: "Nhà Toán Học Nhí", color: "#1e40af", accent: "#3b82f6", score: 0 },
      { id: 3, name: "Vua Tính Nhẩm", color: "#d97706", accent: "#e5a50a", score: 0 },
      { id: 4, name: "Thám Tử Hình Học", color: "#059669", accent: "#10b981", score: 0 }
    ]
  },
  {
    id: "evt_tieng_viet",
    title: "Ngày Hội Em Yêu Tiếng Việt - Văn Học Tuổi Thơ",
    subject: "Tiếng Việt",
    grade: "Lớp 3 - Lớp 4",
    topic: "Luyện từ và câu, ca dao tục ngữ & đố chữ thông minh",
    questionBankId: "bank_tieng_viet",
    createdAt: "2026-11-03T10:10:00Z",
    teams: [
      { id: 1, name: "Chim Sơn Ca", color: "#c82333", accent: "#e63946", score: 0 },
      { id: 2, name: "Bút Măng Non", color: "#1e40af", accent: "#3b82f6", score: 0 },
      { id: 3, name: "Hoa Trạng Nguyên", color: "#d97706", accent: "#e5a50a", score: 0 },
      { id: 4, name: "Cây Bút Vàng", color: "#059669", accent: "#10b981", score: 0 }
    ]
  }
];

// =============================================================================
// 3. CLASS QUẢN LÝ DỮ LIỆU & SỰ KIỆN (QUESTION & EVENT MANAGER)
// =============================================================================

export class QuestionManager {
  constructor() {
    this.storageKey = "OLYMPIA_WORKSPACE_V3";
    this.state = this.loadWorkspace();
    this.data = this.assembleCurrentGameData();
  }

  loadWorkspace() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.events && parsed.questionBanks && parsed.activeEventId) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn("Không thể tải workspace từ localStorage, khởi tạo mặc định:", e);
    }

    return {
      activeEventId: "evt_tong_hop",
      events: JSON.parse(JSON.stringify(DEFAULT_EVENTS)),
      questionBanks: JSON.parse(JSON.stringify(DEFAULT_QUESTION_BANKS))
    };
  }

  saveWorkspace() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.state));
      return true;
    } catch (e) {
      console.error("Lỗi khi lưu workspace vào localStorage:", e);
      return false;
    }
  }

  // Lắp ghép dữ liệu hiện tại để tương thích hoàn toàn với Game Engine
  assembleCurrentGameData() {
    const activeEvt = this.getActiveEvent();
    const bank = this.getQuestionBank(activeEvt.questionBankId) || this.state.questionBanks.bank_tong_hop;

    return {
      eventId: activeEvt.id,
      gameTitle: activeEvt.title,
      subject: activeEvt.subject,
      grade: activeEvt.grade,
      topic: activeEvt.topic,
      teams: activeEvt.teams,
      questionBankId: activeEvt.questionBankId,
      round1: bank.round1,
      round2: bank.round2,
      round3: bank.round3,
      round4: bank.round4
    };
  }

  // --- QUẢN LÝ EVENT ---
  getEvents() {
    return this.state.events;
  }

  getActiveEvent() {
    return this.state.events.find((e) => e.id === this.state.activeEventId) || this.state.events[0];
  }

  selectEvent(eventId) {
    const target = this.state.events.find((e) => e.id === eventId);
    if (!target) return null;

    this.state.activeEventId = eventId;
    this.saveWorkspace();
    this.data = this.assembleCurrentGameData();
    return this.data;
  }

  createEvent({ title, subject, grade, topic, questionBankId, teams }) {
    const newId = `evt_${Date.now()}`;
    const defaultTeams = [
      { id: 1, name: "Đội 1 (Đỏ)", color: "#c82333", accent: "#e63946", score: 0 },
      { id: 2, name: "Đội 2 (Xanh)", color: "#1e40af", accent: "#3b82f6", score: 0 },
      { id: 3, name: "Đội 3 (Vàng)", color: "#d97706", accent: "#e5a50a", score: 0 },
      { id: 4, name: "Đội 4 (Lục)", color: "#059669", accent: "#10b981", score: 0 }
    ];

    const newEvt = {
      id: newId,
      title: title || "Hội Thi Olympia Mới",
      subject: subject || "Kiến thức",
      grade: grade || "Tiểu học",
      topic: topic || "",
      questionBankId: questionBankId || "bank_tong_hop",
      createdAt: new Date().toISOString(),
      teams: teams || defaultTeams
    };

    this.state.events.push(newEvt);
    this.state.activeEventId = newId;
    this.saveWorkspace();
    this.data = this.assembleCurrentGameData();
    return newEvt;
  }

  updateEvent(eventId, fields) {
    const evt = this.state.events.find((e) => e.id === eventId);
    if (!evt) return false;

    Object.assign(evt, fields);
    this.saveWorkspace();
    if (this.state.activeEventId === eventId) {
      this.data = this.assembleCurrentGameData();
    }
    return true;
  }

  deleteEvent(eventId) {
    if (this.state.events.length <= 1) {
      throw new Error("Không thể xóa sự kiện duy nhất còn lại!");
    }

    const idx = this.state.events.findIndex((e) => e.id === eventId);
    if (idx !== -1) {
      this.state.events.splice(idx, 1);
      if (this.state.activeEventId === eventId) {
        this.state.activeEventId = this.state.events[0].id;
      }
      this.saveWorkspace();
      this.data = this.assembleCurrentGameData();
      return true;
    }
    return false;
  }

  // --- QUẢN LÝ NGÂN HÀNG ĐỀ THI (QUESTION BANKS) ---
  getQuestionBanks() {
    return Object.values(this.state.questionBanks);
  }

  getQuestionBank(bankId) {
    return this.state.questionBanks[bankId];
  }

  createQuestionBank({ title, subject, grade, topic, templateBankId }) {
    const newId = `bank_${Date.now()}`;
    const base = this.state.questionBanks[templateBankId] || this.state.questionBanks.bank_tong_hop;
    const newBank = JSON.parse(JSON.stringify(base));

    newBank.id = newId;
    newBank.title = title || "Bộ đề thi mới";
    newBank.subject = subject || base.subject;
    newBank.grade = grade || base.grade;
    newBank.topic = topic || "";

    this.state.questionBanks[newId] = newBank;
    this.saveWorkspace();
    return newBank;
  }

  updateQuestionBank(bankId, updatedData) {
    if (!this.state.questionBanks[bankId]) return false;
    this.state.questionBanks[bankId] = updatedData;
    this.saveWorkspace();
    if (this.data.questionBankId === bankId) {
      this.data = this.assembleCurrentGameData();
    }
    return true;
  }

  // --- IMPORT / EXPORT WORKSPACE ---
  exportJSON() {
    return JSON.stringify(this.state, null, 2);
  }

  importJSON(jsonString) {
    try {
      const parsed = JSON.parse(jsonString);
      // Hỗ trợ cả file cấu trúc mới (workspace) lẫn file cấu trúc đơn v2
      if (parsed.events && parsed.questionBanks) {
        this.state = parsed;
      } else if (parsed.teams && parsed.round1 && parsed.round2) {
        // Chuyển đổi định dạng đơn cũ thành 1 sự kiện mới
        const customId = `bank_imported_${Date.now()}`;
        this.state.questionBanks[customId] = {
          id: customId,
          title: parsed.gameTitle || "Bộ đề đã nạp",
          subject: parsed.subject || "Kiến thức",
          grade: parsed.grade || "Tiểu học",
          topic: parsed.topic || "",
          round1: parsed.round1,
          round2: parsed.round2,
          round3: parsed.round3,
          round4: parsed.round4
        };
        const evtId = `evt_imported_${Date.now()}`;
        this.state.events.unshift({
          id: evtId,
          title: parsed.gameTitle || "Trận đấu nạp từ file",
          subject: parsed.subject || "Kiến thức",
          grade: parsed.grade || "Tiểu học",
          topic: parsed.topic || "",
          questionBankId: customId,
          teams: parsed.teams
        });
        this.state.activeEventId = evtId;
      } else {
        throw new Error("Cấu trúc file dữ liệu không hợp lệ!");
      }

      this.saveWorkspace();
      this.data = this.assembleCurrentGameData();
      return { success: true };
    } catch (e) {
      return { success: false, error: e.message };
    }
  }

  saveData(newData) {
    if (newData) {
      this.data = newData;
      const activeEvt = this.getActiveEvent();
      activeEvt.title = this.data.gameTitle;
      activeEvt.subject = this.data.subject;
      activeEvt.grade = this.data.grade;
      activeEvt.topic = this.data.topic;
      activeEvt.teams = this.data.teams;

      const bank = this.getQuestionBank(activeEvt.questionBankId);
      if (bank) {
        bank.round1 = this.data.round1;
        bank.round2 = this.data.round2;
        bank.round3 = this.data.round3;
        bank.round4 = this.data.round4;
      }
    }
    return this.saveWorkspace();
  }

  resetToDefault() {
    this.state = {
      activeEventId: "evt_tong_hop",
      events: JSON.parse(JSON.stringify(DEFAULT_EVENTS)),
      questionBanks: JSON.parse(JSON.stringify(DEFAULT_QUESTION_BANKS))
    };
    this.saveWorkspace();
    this.data = this.assembleCurrentGameData();
    return this.data;
  }
}

export const questionManager = new QuestionManager();
if (typeof window !== "undefined") {
  window.questionManager = questionManager;
}
