import jsPDF from 'jspdf';
import { Booking } from '../models/booking';

export function downloadBookingReceipt(booking: Booking, bookedBy: string): void {

  const doc = new jsPDF();

  // Header band
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, 210, 32, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('SpaceSync', 14, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.text('Booking Receipt', 14, 27);

  // Body
  doc.setTextColor(30, 41, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.text(`Booking #${booking.id}`, 14, 46);

  let y = 58;
  const row = (label: string, value: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.text(label, 14, y);
    doc.setFont('helvetica', 'normal');
    doc.text(value || '-', 75, y);
    y += 9;
  };

  row('Booked by:', bookedBy);
  row('Space:', booking.space?.name || 'Workspace');
  row('Location:', booking.space?.location || '-');
  row('Type:', booking.space?.type || '-');
  row('Date:', booking.bookingDate);
  row('Start time:', booking.startTime);
  row('Duration:', `${booking.duration} hour(s)`);
  row('Status:', booking.status);

  y += 4;
  doc.setDrawColor(226, 232, 240);
  doc.line(14, y, 196, y);
  y += 14;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(30, 41, 59);
  doc.text('Total Amount', 14, y);

  doc.setFontSize(16);
  doc.setTextColor(37, 99, 235);
  doc.text(`Rs. ${booking.totalAmount}`, 150, y);

  y += 22;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);
  doc.text('This is a system-generated receipt from SpaceSync.', 14, y);

  doc.save(`SpaceSync-Booking-${booking.id}.pdf`);
}